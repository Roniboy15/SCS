import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'
import { FaUser, FaLock } from 'react-icons/fa'
import { useContext } from 'react'
import { AppContext } from '../../../context/context'
import { apiGet } from '../../../services/services' 
import { TOKEN_KEY, USER_INFO } from '../../../constant/constant'
import { useEffect } from 'react'
import Modal from '../../../shared/components/modal'
const navigation = [
  { name: 'Home', href: '/', current: true },
]
const menu = [
  { name: 'Login', href: '/login' },
  { name: 'SignUp', href: '/signUp' },
]
const menuProfile = [
  { name: 'ToDo List', href: '/todo' },
  { name: 'Logout', href: '/logout' },
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  const nav = useNavigate()
  const { user, getUser } = useContext(AppContext)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(TOKEN_KEY) && !user) {
      getUser()
    }
  }, [user])

  return (
    <>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <FaUser className="block h-8 w-auto lg:hidden" color='white' size={'30px'} />
                    <FaUser className="hidden h-8 w-auto lg:block" color='white' size={'30px'} />
                    {/* <img
                   
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />

                  <img
                   
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  /> */}
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'px-3 py-2 rounded-md text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={user?.profileImg ? user.profileImg : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-fMXEWyzl7MNd3Q15JOeyzHxasfVIHK6K_A&usqp=CAU"}
                          alt="profileImg"
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >


                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

                        {!user ?
                          <div>
                            {menu.map((item, i) => (
                              <Menu.Item key={i}>
                                {({ active }) => (
                                  <button
                                    onClick={() => {
                                      nav(item.href)
                                    }}
                                    className={classNames(active ? 'bg-gray-100' : '', 'w-[100%] block px-4 py-2 text-sm text-gray-700')}
                                  >
                                    {item.name}
                                  </button>
                                )}
                              </Menu.Item>

                            ))}
                          </div>

                          :
                          <div >

                            {menuProfile.map((item, i) => (
                              <Menu.Item key={i}>

                                {({ active }) => (
                                  <button
                                  
                                    onClick={() => {
                                      if (item.href !== '/logout') {
                                        nav(item.href)
                                      } else {
                                        // open modal
                                        setShowModal(true)
                                      }


                                    }}
                                    className={classNames(active ? 'bg-gray-100' : '', 'w-[100%] block px-4 py-2 text-sm text-gray-700 ')}
                                  >
                                    {item.name}
                                  </button>
                                )}
                              </Menu.Item>

                            ))}
                          </div>
                        }

                      </Menu.Items>
                    </Transition>
                  </Menu>

                  {/* Profile dropdown */}
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    to={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <Modal
        open={showModal}
        setOpen={setShowModal}
        href={'/logout'}
        redButtonText={'Logout'}
        grayButtonText={'Cancel'}
        header={'Are you sure?'}
        description={`Are you sure you want to end your current session and log out of your account? You'll need to log in again to access your saved information and continue where you left off.`}
      />
    </>
  )
}
