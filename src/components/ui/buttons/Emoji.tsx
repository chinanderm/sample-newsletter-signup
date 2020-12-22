import React from 'react'

export type EmojiProps = {
   label: string
   symbol: string
}
const Emoji: React.FC<EmojiProps> = ({ label, symbol }) => {
   return (
      <span
         className="emoji"
         role="img"
         aria-label={label}
      >
         {symbol}
      </span>
   )
}

export default Emoji
