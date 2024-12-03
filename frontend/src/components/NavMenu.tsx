 import { Link } from "react-router-dom";

interface Props {
    text: string
    link: string
    icon: React.ReactNode
}

const NavMenu:React.FC<Props> = ({icon, text, link}) => {
  return (
    <Link to={link} className="flex items-center gap-3 hover:bg-[#0C8BFF] py-3 px-5 rounded-md">
        {icon}
        <span className="text-lg">{text}</span>
    </Link>
  )
}

export default NavMenu
