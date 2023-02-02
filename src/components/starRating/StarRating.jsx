import React from "react";
import { MdOutlineStarHalf,MdOutlineStarOutline,MdOutlineStarPurple500 } from "react-icons/md"

export default function StarRating({full,half}) {
  return (
    <div>
        { full ? <MdOutlineStarPurple500/> : half ? <MdOutlineStarHalf/> : <MdOutlineStarOutline/> }
    </div>
  )
}
