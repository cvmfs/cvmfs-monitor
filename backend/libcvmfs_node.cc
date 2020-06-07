#include <napi.h>
#include <libcvmfs.h>
#include <stdio.h>
#include <map>
#include <sstream>

cvmfs_option_map *g_opts;
cvmfs_context *g_ctx;

std::map <std::string, cvmfs_context *> g_attached_repos;

bool AttachRepo(const std::string repo) {
  cvmfs_option_map *opts = cvmfs_options_clone(g_opts);
  cvmfs_options_parse_default(opts, repo.c_str());
  cvmfs_context *context;
  cvmfs_attach_repo_v2(repo.c_str(), opts, &context);
  cvmfs_adopt_options(context, opts);
  g_attached_repos[repo] = context;
  return opts;
}

cvmfs_context *GetRepoCtx(const std::string repo) {
  if (g_attached_repos.count(repo) == 0) {
    if (!AttachRepo(repo)) return NULL;
  }
  return g_attached_repos[repo];
}

void FillStat(cvmfs_stat_t *st, Napi::Object *obj) {
  obj->Set("name", std::string(st->name));
  obj->Set("size", st->info.st_size);
  obj->Set("mtime", st->info.st_mtim.tv_sec);
  obj->Set("is_dir", S_ISDIR(st->info.st_mode));
  obj->Set("is_link", S_ISLNK(st->info.st_mode));
}

void FillAttr(cvmfs_attr *attr, Napi::Object *obj) {
  obj->Set("is_dir", S_ISDIR(attr->st_mode));
  obj->Set("is_link", S_ISLNK(attr->st_mode));
  obj->Set("size", attr->st_size);
  obj->Set("mtime", attr->mtime);
  obj->Set("checksum", std::string(attr->cvm_checksum));
  obj->Set("symlink", std::string(attr->cvm_symlink));
  obj->Set("parent", std::string(attr->cvm_parent));
  obj->Set("name", std::string(attr->cvm_name));
}

void FillNc(cvmfs_nc_attr *nc, Napi::Object *obj) {
  obj->Set("mountpoint", std::string(nc->mountpoint));
  obj->Set("hash", std::string(nc->hash));
  obj->Set("size", nc->size);

  Napi::Object counters = Napi::Object::New(obj->Env());
  counters.Set("regular", nc->ctr_regular);
  counters.Set("symlink", nc->ctr_symlink);
  counters.Set("dir", nc->ctr_dir);
  counters.Set("nested", nc->ctr_nested);
  counters.Set("chunked", nc->ctr_chunked);
  counters.Set("chunks", nc->ctr_chunks);
  counters.Set("file_size", nc->ctr_file_size);
  counters.Set("chunked_size", nc->ctr_chunked_size);
  counters.Set("xattr", nc->ctr_xattr);
  counters.Set("external", nc->ctr_external);
  counters.Set("external_file_size", nc->ctr_external_file_size);

  obj->Set("counters", counters);
}

Napi::Value WrongArgsError(const Napi::Env env) {
  Napi::TypeError::New(env, "Wrong arguments")
    .ThrowAsJavaScriptException();
  return env.Null();
}


Napi::Value GetOption(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  if (info.Length() < 2 || !info[0].IsString() || !info[1].IsString()) {
    return WrongArgsError(env);
  }

  std::string repo = info[0].As<Napi::String>();
  std::string key = info[1].As<Napi::String>();

  cvmfs_option_map *opts = cvmfs_options_init_v2(0);
  cvmfs_options_parse_default(opts, repo.c_str());
  char *val = cvmfs_options_get(opts, key.c_str());
  cvmfs_options_fini(opts);
  if (val) {
    Napi::Value res = Napi::String::New(env, val);
    free(val);
    return res;
  } else {
    return Napi::String();
  }
}

Napi::Value Stat(const Napi::CallbackInfo &info) {
  Napi::Env env = info.Env();
  if (info.Length() < 2 || !info[0].IsString() || !info[1].IsString()) {
    return WrongArgsError(env);
  }

  Napi::Object result = Napi::Object::New(env);

  std::string repo = info[0].As<Napi::String>();
  std::string path = info[1].As<Napi::String>();

  cvmfs_context *ctx = GetRepoCtx(repo);
  cvmfs_attr *attr = cvmfs_attr_init();
  int retval = cvmfs_stat_attr(ctx, path.c_str(), attr);
  if (retval) {
    fprintf(stderr, "failed to stat file %s\n", path.c_str());
  }
  FillAttr(attr, &result);

  cvmfs_attr_free(attr);

  if (S_ISDIR(attr->st_mode)) {
    const int kInitialBufSize = 16;
    cvmfs_stat_t *buf = reinterpret_cast<cvmfs_stat_t *>(calloc(kInitialBufSize, sizeof(cvmfs_stat_t)));
    size_t listlen = 0;
    size_t buflen = kInitialBufSize;
    cvmfs_listdir_stat(ctx, path.c_str(), &buf, &listlen, &buflen);

    Napi::Array list = Napi::Array::New(env, listlen);
    for (size_t i = 0; i < listlen; ++i) {
      Napi::Object cur_obj = Napi::Object::New(env);
      FillStat(&buf[i], &cur_obj);
      list[i] = cur_obj;
    }
    result.Set("ls", list);
  }

  cvmfs_nc_attr *nc = cvmfs_nc_attr_init();
  if (cvmfs_stat_nc(ctx, path.c_str(), nc) == 0) {
    Napi::Object cat_obj = Napi::Object::New(env);
    FillNc(nc, &cat_obj);
    result.Set("catalog", cat_obj);
  }
  cvmfs_nc_attr_free(nc);

  return result;
}

Napi::Value Open(const Napi::CallbackInfo &info) {
  Napi::Env env = info.Env();
  if (info.Length() < 2 || !info[0].IsString() || !info[1].IsString()) {
    return WrongArgsError(env);
  }

  std::string repo = info[0].As<Napi::String>();
  std::string path = info[1].As<Napi::String>();

  cvmfs_context *ctx = GetRepoCtx(repo);
  int fd = cvmfs_open(ctx, path.c_str());
  return Napi::Number::New(env, fd);
}

Napi::Value Pread(const Napi::CallbackInfo &info) {
  Napi::Env env = info.Env();

  if (info.Length() < 4 || !info[0].IsString() || !info[1].IsNumber() ||
      !info[2].IsNumber() || !info[3].IsNumber())
  {
    return WrongArgsError(env);
  }

  std::string repo = info[0].As<Napi::String>();
  int fd = info[1].As<Napi::Number>();
  int64_t size = info[2].As<Napi::Number>();
  int64_t offset = info[3].As<Napi::Number>();

  cvmfs_context *ctx = GetRepoCtx(repo);

  Napi::ArrayBuffer buf = Napi::ArrayBuffer::New(env, size);

  ssize_t bytesRead = cvmfs_pread(ctx, fd, buf.Data(), size, offset);

  Napi::Object res = Napi::Object::New(env);
  res.Set("buffer", buf);
  res.Set("bytesRead", bytesRead);

  return res;
}

Napi::Value Close(const Napi::CallbackInfo &info) {
  Napi::Env env = info.Env();
  if (info.Length() < 2 || !info[0].IsString() || !info[1].IsNumber()) {
    return WrongArgsError(env);
  }

  std::string repo = info[0].As<Napi::String>();
  int fd = info[1].As<Napi::Number>();

  cvmfs_context *ctx = GetRepoCtx(repo);
  if (!ctx) return Napi::Boolean::New(env, false);

  int retcode = cvmfs_close(ctx, fd);
  return Napi::Boolean::New(env, retcode == 0);
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  g_opts = cvmfs_options_init_v2(0);
  int init_retcode = cvmfs_init_v2(g_opts);
  if (init_retcode != 0) {
    std::stringstream error_msg;
    error_msg << "Could not init libcvfs (error " << init_retcode << ")";
    Napi::Error::New(env, error_msg.str());
  }
  exports.Set(Napi::String::New(env, "getOption"), Napi::Function::New(env, GetOption));
  exports.Set(Napi::String::New(env, "stat"), Napi::Function::New(env, Stat));
  exports.Set(Napi::String::New(env, "open"), Napi::Function::New(env, Open));
  exports.Set(Napi::String::New(env, "pread"), Napi::Function::New(env, Pread));
  exports.Set(Napi::String::New(env, "close"), Napi::Function::New(env, Close));
  return exports;
}

NODE_API_MODULE(addon, Init)