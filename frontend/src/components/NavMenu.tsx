 
interface Props {
    text: string
    icon: React.ReactNode
}

const NavMenu:React.FC<Props> = ({icon, text}) => {
  return (
    <div className="flex items-center gap-3 hover:bg-[#0C8BFF] py-3 px-5 rounded-md">
        {icon}
        <span className="text-lg">{text}</span>
    </div>
  )
}

export default NavMenu
