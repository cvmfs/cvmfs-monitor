const initState = {
  repositories: [
    {
      id: 1,
      name: "MICE (mice.egi.eu)",
      url: "mice.egi.eu",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 2,
      name: "WENMR (wenmr.egi.eu)",
      url: "wenmr.egi.eu",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 3,
      name: "Physics IBERGRID (phys-ibergrid.egi.eu)",
      url: "phys-ibergrid.egi.eu",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 4,
      name: "ATLAS nightlies (atlas-nightlies.cern.ch)",
      url: "atlas-nightlies.cern.ch",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 5,
      name: "ILC (ilc.desy.de)",
      url: "ilc.desy.de",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 6,
      name: "Blue Brain Project (bbp.epfl.ch)",
      url: "bbp.epfl.ch",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 7,
      name: "CernVM 3 (cernvm-prod.cern.ch)",
      url: "cernvm-prod.cern.ch",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 8,
      name: "Biomed (biomed.egi.eu)",
      url: "biomed.egi.eu",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 9,
      name: "T2K (t2k.egi.eu)",
      url: "t2k.egi.eu",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 10,
      name: "ALICE Conditions (alice-ocdb.cern.ch)",
      url: "alice-ocdb.cern.ch",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 11,
      name: "CALICE (calice.desy.de)",
      url: "calice.desy.de",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 12,
      name: "HERMES (hermes.desy.de)",
      url: "hermes.desy.de",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 13,
      name: "H1 (hone.desy.de)",
      url: "hone.desy.de",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 14,
      name: "OLYMPUS (olympus.desy.de)",
      url: "olympus.desy.de",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 15,
      name: "XFEL (xfel.desy.de)",
      url: "xfel.desy.de",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 16,
      name: "ZEUS (zeus.desy.de)",
      url: "zeus.desy.de",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 17,
      name: "ALEPH (aleph.cern.ch)",
      url: "aleph.cern.ch",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 18,
      name: "CvmFS Configuration (cvmfs-config.cern.ch)",
      url: "cvmfs-config.cern.ch",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 19,
      name: "CERN@School (cernatschool.egi.eu)",
      url: "cernatschool.egi.eu",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 20,
      name: "GLAST (glast.egi.eu)",
      url: "glast.egi.eu",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 21,
      name: "HyperK (hyperk.egi.eu)",
      url: "hyperk.egi.eu",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 22,
      name: "SNO+ (snoplus.egi.eu)",
      url: "snoplus.egi.eu",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 23,
      name: "PHENO (pheno.egi.eu)",
      url: "pheno.egi.eu",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 24,
      name: "LHCb Nightlies (lhcbdev.cern.ch)",
      url: "lhcbdev.cern.ch",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 25,
      name: "OASIS (oasis.opensciencegrid.org)",
      url: "oasis.opensciencegrid.org",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 26,
      name: "CMS Opendata Conditions (cms-opendata-conddb.cern.ch)",
      url: "cms-opendata-conddb.cern.ch",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 27,
      name: "NA62 (na62.cern.ch)",
      url: "na62.cern.ch",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 28,
      name: "CMS Nightlies (cms-ib.cern.ch)",
      url: "cms-ib.cern.ch",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 29,
      name: "ATLAS (atlas.cern.ch)",
      url: "atlas.cern.ch",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 30,
      name: "LHCb (lhcb.cern.ch)",
      url: "lhcb.cern.ch",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 31,
      name: "ALICE (alice.cern.ch)",
      url: "alice.cern.ch",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 32,
      name: "Geant4 (geant4.cern.ch)",
      url: "geant4.cern.ch",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 33,
      name: "CMS (cms.cern.ch)",
      url: "cms.cern.ch",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 34,
      name: "AMS (ams.cern.ch)",
      url: "ams.cern.ch",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 35,
      name: "IceCube (icecube.opensciencegrid.org)",
      url: "icecube.opensciencegrid.org",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 36,
      name: "Future Circular Collider (fcc.cern.ch)",
      url: "fcc.cern.ch",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 37,
      name: "AUGER (auger.egi.eu)",
      url: "auger.egi.eu",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 38,
      name: "KM3Net (km3net.egi.eu)",
      url: "km3net.egi.eu",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 39,
      name: "Ganga Grid Client (ganga.cern.ch)",
      url: "ganga.cern.ch",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 40,
      name: "Darkside (darkside.opensciencegrid.org)",
      url: "darkside.opensciencegrid.org",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 41,
      name: "Dark Energy Survey (des.opensciencegrid.org)",
      url: "des.opensciencegrid.org",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 42,
      name: "Fermilab (fermilab.opensciencegrid.org)",
      url: "fermilab.opensciencegrid.org",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 43,
      name: "Muon g-2 Experiment (gm2.opensciencegrid.org)",
      url: "gm2.opensciencegrid.org",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 44,
      name: "LArIAT (lariat.opensciencegrid.org)",
      url: "lariat.opensciencegrid.org",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 45,
      name: "Large Synoptic Survey Telescope (lsst.opensciencegrid.org)",
      url: "lsst.opensciencegrid.org",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 46,
      name: "MINOS Experiment (minos.opensciencegrid.org)",
      url: "minos.opensciencegrid.org",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 47,
      name: "Mu2e (mu2e.opensciencegrid.org)",
      url: "mu2e.opensciencegrid.org",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 48,
      name: "NOvA Neutrino Experiment (nova.opensciencegrid.org)",
      url: "nova.opensciencegrid.org",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 49,
      name: "SeaQuest (seaquest.opensciencegrid.org)",
      url: "seaquest.opensciencegrid.org",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 50,
      name: "US ATLAS T3 (usatlast3.opensciencegrid.org)",
      url: "usatlast3.opensciencegrid.org",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 51,
      name: "MoEDAL (moedal.cern.ch)",
      url: "moedal.cern.ch",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 52,
      name: "OPAL (opal.cern.ch)",
      url: "opal.cern.ch",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 53,
      name: "TEST (test.cern.ch)",
      url: "test.cern.ch",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 54,
      name: "NA49 (na49.cern.ch)",
      url: "na49.cern.ch",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 55,
      name: "Pravda (pravda.egi.eu)",
      url: "pravda.egi.eu",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 56,
      name: "GHOST (ghost.egi.eu)",
      url: "ghost.egi.eu",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 57,
      name: "CLICdp (clicdp.cern.ch)",
      url: "clicdp.cern.ch",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 58,
      name: "ALICE nightlies (alice-nightlies.cern.ch)",
      url: "alice-nightlies.cern.ch",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 59,
      name: "COMPASS (compass.cern.ch)",
      url: "compass.cern.ch",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 60,
      name: "DIRAC (dirac.egi.eu)",
      url: "dirac.egi.eu",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 61,
      name: "Chipster (chipster.egi.eu)",
      url: "chipster.egi.eu",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 62,
      name: "Comet (comet.egi.eu)",
      url: "omet.egi.eu",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 63,
      name: "Galdyn (galdyn.egi.eu)",
      url: "galdyn.egi.eu",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 64,
      name: "LIGO (ligo.egi.eu)",
      url: "ligo.egi.eu",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 65,
      name: "Neugrid (neugrid.egi.eu)",
      url: "neugrid.egi.eu",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 66,
      name: "ResearchInSchools (researchinschools.egi.eu)",
      url: "researchinschools.egi.eu",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 67,
      name: "SuperNEMO (supernemo.egi.eu)",
      url: "supernemo.egi.eu",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 68,
      name: "WestLife (west-life.egi.eu)",
      url: "west-life.egi.eu",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 69,
      name: "Belle (belle.cern.ch)",
      url: "belle.cern.ch",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 70,
      name: "Boss (boss.cern.ch)",
      url: "boss.cern.ch",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 71,
      name: "Grid (grid.cern.ch)",
      url: "grid.cern.ch",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 72,
      name: "NA61 (na61.cern.ch)",
      url: "na61.cern.ch",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 73,
      name: "SFT (sft.cern.ch)",
      url: "sft.cern.ch",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 74,
      name: "ATLAS conditions data (atlas-condb.cern.ch)",
      url: "atlas-condb.cern.ch",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 75,
      name: "SFT Nightlies (sft-nightlies.cern.ch)",
      url: "sft-nightlies.cern.ch",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 76,
      name: "DArk Matter Particle Explorer (dampe.cern.ch)",
      url: "dampe.cern.ch",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 77,
      name: "SHiP - Search for Hidden Particles (ship.cern.ch)",
      url: "ship.cern.ch",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 78,
      name: "EXTraS (extras-fp7.egi.eu)",
      url: "extras-fp7.egi.eu",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 79,
      name: "SoftDrive (softdrive.nl)",
      url: "softdrive.nl",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 80,
      name: "LHCb Conditions Data (lhcb-condb.cern.ch)",
      url: "lhcb-condb.cern.ch",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    },
    {
      id: 81,
      name: "LSST Software (sw.lsst.eu)",
      url: "sw.lsst.eu",
      repositoryWebsite: "http://cvmfs-stratum-one.cern.ch/cvmfs"
    }
  ],
  repository: []
};

const rootReducer = (state = initState, action) => {
  // console.log(action);
  if (action.type === "GET_REPOSITORY") {
    let clickedRepository = state.repositories.filter(repository => {
      return action.id === repository.id;
    });
    return {
      ...state,
      repository: clickedRepository
    };
  }
  return state;
};

export default rootReducer;
