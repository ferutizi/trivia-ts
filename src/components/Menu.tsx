import './Menu.css'

interface MenuProps {
  children: React.ReactNode
  menuState: boolean
}

const Menu = (props: MenuProps): JSX.Element => {
  return (
    <>
      {
      props.menuState
        ? <div className='menu__overlay'>
          <div className='menu__card'>
            {props.children}
            {/* eslint-disable-next-line react/jsx-closing-tag-location */}
          </div>
          {/* eslint-disable-next-line react/jsx-closing-tag-location */}
        </div>
        : <div />
      }
    </>
  )
}

export default Menu
