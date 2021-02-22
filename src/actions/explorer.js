import store from "../store";
import axios from "axios";
const openDrive = () => {};
const unknownFileIco = <i className="ri-file-unknow-line"></i>;

const MAPExtension = [
  {
    extension: ".txt",
    element: <i className="ri-file-list-2-fill"></i>,
  },
  {
    extension:
      ".cpp.hpp.py.js.json.java.class.c.html.css.scss.sass.cgi.php.sh.swift.vb.mk.bp.makefile.kt.git.lock",
    element: <i className="ri-file-code-fill"></i>,
  },
  {
    extension: ".pptx.pps",
    element: <i className="ri-file-ppt-2-fill"></i>,
  },
  {
    extension: ".docx",
    element: <i className="ri-file-word-2-fill"></i>,
  },
  {
    extension: ".xlsx.xlsm",
    element: <i className="ri-file-excel-2-fill"></i>,
  },
  {
    extension: ".pdf",
    element: <i className="ri-file-pdf-fill"></i>,
  },
  {
    extension: ".mp3.m4a.wav.aif.midi.ogg.mpa.wma",
    element: <i className="ri-file-music-fill"></i>,
  },
  {
    extension: ".jpg.jpeg.bmp.png.ico.svg.gif.psd.ai",
    element: <i className="ri-image-fill"></i>,
  },
  {
    extension: ".3gp.avi.flv.h264.mkv.m4v.mov.mp4.mpg.mpeg.swf.rm.vob.wmv",
    element: <i className="ri-film-fill"></i>,
  },
  {
    extension: ".bak.cab.conf.cfg.cpl.cur.dll.dmp.drv.ini.lnk.sys.tmp",
    element: <i className="ri-file-settings-fill"></i>,
  },
  {
    extension: ".exe.gadget.jar.msi",
    element: <i className="ri-install-fill"></i>,
  },
  {
    extension: ".bat.com.gadget.wsf",
    element: <i className="ri-file-paper-fill"></i>,
  },
  {
    extension: ".apk",
    element: <i className="ri-android-fill"></i>,
  },
  {
    extension: ".rar.tar.gz.zip.7z.deb.pkg.rpm",
    element: <i className="ri-file-zip-fill"></i>,
  },
  {
    extension: ".bin.dmg.iso.toast.vcd.nrg",
    element: <i className="ri-folder-zip-fill"></i>,
  },
];

const getIco = (extension, is_dir, up) => {
  if (up) return <i className="ri-arrow-go-back-line"></i>;
  if (is_dir) return <i className="ri-folder-line"></i>;

  const element = MAPExtension.filter((item) => {
    return item.extension.includes(extension);
  });
  return element[0] !== undefined ? element[0].element : unknownFileIco;
};

const getExtension = (fileName) => {
  return fileName.lastIndexOf(".") === -1
    ? ""
    : fileName.substr(fileName.lastIndexOf("."), fileName.length);
};

const getSizeStr = (size) => {
  if (size < 1024) return `${size} bytes`;
  size /= 1024;
  if (size < 1024) return `${size.toFixed(1)} KB`;
  size /= 1024;
  if (size < 1024) return `${size.toFixed(2)} MB`;
  size /= 1024;
  if (size < 1024) return `${size.toFixed(3)} GB`;
  size /= 1024;
  return `${size.toFixed(3)} TB`;
};

const dirData = async () => {
  const path = store.getState().explorerReducer.path;
  const explorerConst = store.getState().explorerControlReducer;
  try {
    const res = await axios.get(`http://${explorerConst.address}/dir/`, {
      params: { path },
    });
    if (res.status === 200) {
      store.dispatch({ type: "STORE_EXPLORER_DATA", data: res.data });
    }
  } catch (Error) {}
};

const is_replace = (fileName) => {
  const fileData = store.getState().explorerReducer.data;
  const ret = fileData.find((item) => {
    return item.name === fileName;
  });
  return ret;
};

export { openDrive, getIco, getExtension, getSizeStr, dirData, is_replace };
