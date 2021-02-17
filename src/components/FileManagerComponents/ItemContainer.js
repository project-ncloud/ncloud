import {React} from 'react'
import ItemCard from './ItemCard'



function ItemContainer({itemData, upFunc, downFunc}) {

    return (
        <div className="fItemContainer fPadding cardContainer">
            <ItemCard name="Go Back" isDir={false} size={6} extension=".txt" date="69th June, 6969" up={true} upFunc={upFunc}/>
            {itemData.filter(item => {return item.is_dir === true}).map(item =>{
                return(
                    <ItemCard key={item.stat + item.name} name={item.name} isDir={item.is_dir} size={item.size} extension={item.extension} date="69th June, 6969" downFunc={downFunc}/>
                )
            })}
            {itemData.filter(item => {return item.is_dir === false}).map(item =>{
                return(
                    <ItemCard key={item.stat + item.name} name={item.name} isDir={false} size={item.size} extension={item.extension} date="69th June, 6969"/>
                )
            })}
            {/* <ItemCard name="Guuna.txt" isDir={false} size={6} extension=".txt" date="69th June, 6969"/>
            <ItemCard name="Gooner.ppt" isDir={false} size={69} extension=".ppt" date="69th June, 6969"/>
            <ItemCard name="B4PPAr.doc" isDir={false} size={9} extension=".doc" date="69th June, 6969"/>
            <ItemCard name="Muriwalar.xls" isDir={false} size={5} extension=".apk" date="69th June, 6969"/>
            <ItemCard name="SalmanKhanaffdafadfafasfafs.mp4" isDir={false} size={6} extension=".bin" date="69th June, 6969"/> */}
        </div>
    )
}

export default ItemContainer
