import React from 'react'

const unknownFileIco = <i className='ri-file-unknow-line'></i>

const ItemCard = ({
  name,
  isDir,
  extension,
  date,
  size,
  up = false,
  upFunc,
  downFunc,
}) => {
  const MAPExtension = [
    {
      extension: '.txt',
      element: <i className='ri-file-list-2-fill'></i>,
    },
    {
      extension:
        '.cpp.hpp.py.js.json.java.class.c.html.css.scss.sass.cgi.php.sh.swift.vb.mk.bp.makefile.kt.git.lock',
      element: <i className='ri-file-code-fill'></i>,
    },
    {
      extension: '.pptx.pps',
      element: <i className='ri-file-ppt-2-fill'></i>,
    },
    {
      extension: '.docx',
      element: <i className='ri-file-word-2-fill'></i>,
    },
    {
      extension: '.xlsx.xlsm',
      element: <i className='ri-file-excel-2-fill'></i>,
    },
    {
      extension: '.pdf',
      element: <i className='ri-file-pdf-fill'></i>,
    },
    {
      extension: '.mp3.m4a.wav.aif.midi.ogg.mpa.wma',
      element: <i className='ri-file-music-fill'></i>,
    },
    {
      extension: '.jpg.jpeg.bmp.png.ico.svg.gif.psd.ai',
      element: <i className='ri-image-fill'></i>,
    },
    {
      extension: '.3gp.avi.flv.h264.mkv.m4v.mov.mp4.mpg.mpeg.swf.rm.vob.wmv',
      element: <i className='ri-film-fill'></i>,
    },
    {
      extension: '.bak.cab.conf.cfg.cpl.cur.dll.dmp.drv.ini.lnk.sys.tmp',
      element: <i className='ri-file-settings-fill'></i>,
    },
    {
      extension: '.exe.gadget.jar.msi',
      element: <i className='ri-install-fill'></i>,
    },
    {
      extension: '.bat.com.gadget.wsf',
      element: <i className='ri-file-paper-fill'></i>,
    },
    {
      extension: '.apk',
      element: <i className='ri-android-fill'></i>,
    },
    {
      extension: '.rar.tar.gz.zip.7z.deb.pkg.rpm',
      element: <i className='ri-file-zip-fill'></i>,
    },
    {
      extension: '.bin.dmg.iso.toast.vcd.nrg',
      element: <i className='ri-folder-zip-fill'></i>,
    },
  ]

  const getIco = (extension, is_dir, up) => {
    if (up) return <i className='ri-arrow-go-back-line'></i>
    if (isDir) return <i className='ri-folder-line'></i>

    const element = MAPExtension.filter(item => {
      return item.extension.includes(extension)
    })
    return element[0] !== undefined ? element[0].element : unknownFileIco
  }

  const dummyFunc = () => {
    return
  }

  //
  const longPath = name.split('/')
  const file_name = longPath[longPath.length - 1]
  longPath.pop()
  const path = longPath.join('/')

  return (
    <a
      href={`http://127.0.0.1:6900/testRoute/?path=${path}&file_name=${file_name}`}>
      <div
        className='card'
        onClick={() => {
          console.log(file_name, path)

          // axios
          //   .get('http://127.0.0.1:6900/testRoute/', {
          //     params: {path, file_name},
          //   })
          //   .then(res => console.log(res))
          //   .catch(err => console.error(err))

          up ? upFunc() : dummyFunc()
        }}
        onDoubleClick={() => {
          isDir ? downFunc(name) : dummyFunc()
        }}>
        {getIco(extension, isDir, up)}
        <p className='fName'>{name}</p>
        {!up && !isDir ? <p className='fSize'>{size}</p> : false}
      </div>
    </a>
  )
}

export default ItemCard
