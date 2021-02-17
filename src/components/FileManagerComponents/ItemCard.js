import React from 'react'

const unknownFileIco = <i class="ri-file-unknow-line"></i>

const ItemCard = ({name, isDir, extension, date, size, up = false, upFunc, downFunc}) => {
    const MAPExtension = [
        {
            "extension" : ".txt",
            "element" : <i class="ri-file-list-2-fill"></i>
        },
        {
            "extension" : ".cpp.hpp.py.js.json.java.class.c.html.css.scss.sass.cgi.php.sh.swift.vb.mk.bp.makefile.kt.git.lock",
            "element" : <i class="ri-file-code-fill"></i>
        },
        {
            "extension" : ".pptx.pps",
            "element" : <i class="ri-file-ppt-2-fill"></i>
        },
        {
            "extension" : ".docx",
            "element" : <i class="ri-file-word-2-fill"></i>
        },
        {
            "extension" : ".xlsx.xlsm",
            "element" : <i class="ri-file-excel-2-fill"></i>
        },
        {
            "extension" : ".pdf",
            "element" : <i class="ri-file-pdf-fill"></i>
        },
        {
            "extension" : ".mp3.m4a.wav.aif.midi.ogg.mpa.wma",
            "element" : <i class="ri-file-music-fill"></i>
        },
        {
            "extension" : ".jpg.jpeg.bmp.png.ico.svg.gif.psd.ai",
            "element" : <i class="ri-image-fill"></i>
        },
        {
            "extension" : ".3gp.avi.flv.h264.mkv.m4v.mov.mp4.mpg.mpeg.swf.rm.vob.wmv",
            "element" : <i class="ri-film-fill"></i>
        },
        {
            "extension" : ".bak.cab.conf.cfg.cpl.cur.dll.dmp.drv.ini.lnk.sys.tmp",
            "element" : <i class="ri-file-settings-fill"></i>
        },
        {
            "extension" : ".exe.gadget.jar.msi",
            "element" : <i class="ri-install-fill"></i>
        },
        {
            "extension" : ".bat.com.gadget.wsf",
            "element" : <i class="ri-file-paper-fill"></i>
        },
        {
            "extension" : ".apk",
            "element" : <i class="ri-android-fill"></i>
        },
        {
            "extension" : ".rar.tar.gz.zip.7z.deb.pkg.rpm",
            "element" : <i class="ri-file-zip-fill"></i>
        },
        {
            "extension" : ".bin.dmg.iso.toast.vcd.nrg",
            "element" : <i class="ri-folder-zip-fill"></i>
        }
    ]

    const getIco = (extension, is_dir, up) =>{
        if(up) return <i class="ri-arrow-go-back-line"></i>
        if(isDir) return <i class="ri-folder-line"></i>

        const element = MAPExtension.filter(item => {
            return item.extension.includes(extension)
        })
        return element[0] !== undefined ? element[0].element : unknownFileIco
    }

    const dummyFunc = ()=>{
        return
    }
    return (
        <div className="card" onClick={()=>{up ? upFunc() : dummyFunc()}} onDoubleClick={()=>{isDir ? downFunc(name) : dummyFunc()}}>
            {getIco(extension, isDir, up)}
            <p className="fName">{name}</p>
            {!up && !isDir ? <p className="fSize">{size}</p> : false}

        </div>
    )
}

export default ItemCard
