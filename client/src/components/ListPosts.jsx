import React from 'react'
import ProfilePropertyCard from './Cards/ProfilePropertyCard'

const ListPosts = ({ data }) => {

    return (
        <div className="flex flex-col gap-14">
            <div className="flex flex-col gap-5">
                <h2 className="text-2xl w-full bg-light_brown_3/30 p-2">User Posts</h2>
                {data && data.userPosts.map((item, index) => (
                    <div key={index} className="px-10">
                        <ProfilePropertyCard item={item} />
                        <div className="w-full h-[1px] mt-5 mb-5 bg-light_brown_3" />
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-5">
                <h2 className="text-2xl w-full bg-light_brown_3/30 p-2">Saved Posts</h2>
                {data && data.savedPosts.map((item, index) => (
                    <div key={index} className="px-10">
                        <ProfilePropertyCard item={item} saved={true} />
                        <div className="w-full h-[1px] mt-5 mb-5 bg-light_brown_3" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ListPosts