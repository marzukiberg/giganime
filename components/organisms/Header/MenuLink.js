import Link from "next/link"

const MenuLink = ({
    to = '#', label
}) => {
    return <Link href={to}><a href="#" className="text-white p-2">{label}</a></Link>
}
export default MenuLink