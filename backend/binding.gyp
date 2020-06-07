{
  "targets": [
    {
      "target_name": "libcvmfs_node",
      "cflags!": [ "-fno-exceptions" ],
      "cflags_cc!": [ "-fno-exceptions" ],
      "sources": [ "libcvmfs_node.cc" ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")",
        "."
      ],
      "libraries": [
        "-lcvmfs",
        # "/usr/lib64/libcvmfs.a",
        "-lcurl",
        "-luuid"],
      'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ],
    }
  ]
}
