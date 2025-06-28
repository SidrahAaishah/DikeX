import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { initFlowbite } from 'flowbite';
import { handleLogout } from '../utilities/utils';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const { user, loading } = useSelector((state) => state.auth);
   const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    initFlowbite();
  }, []);

  const renderUserDropdown = () => {
    if (loading) {
      return (
        <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
          Loading user...
        </div>
      );
    }

    if (!user) {
      return (
        <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
          Not logged in
        </div>
      );
    }

    return (
      <>
        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
          <div>{user.name}</div>
          <div className="font-medium truncate">{user.email}</div>
        </div>
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
          <li>
            <a
              href="/dashboard"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="/settings"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Settings
            </a>
          </li>
        </ul>
        <div className="py-2">
          <button onClick={()=>handleLogout(dispatch,navigate)}
            href="/login"
            className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-red-400 dark:hover:text-white"
          >
            Logout
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      {/* Top Bar */}
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="OJ Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              DikeX
            </span>
          </a>

          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <a
              href="/contact"
              className="text-sm text-gray-500 dark:text-white hover:underline"
            >
              Contact
            </a>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                id="dropdownUserAvatarButton"
                data-dropdown-toggle="dropdownAvatar"
                className="flex text-sm bg-gray-800 rounded-full focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
                type="button"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  alt="user"
                />
              </button>

              {/* Dropdown Menu */}
              <div
                id="dropdownAvatar"
                className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute right-0 mt-2"
              >
                {renderUserDropdown()}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Navigation Menu */}
      <nav className="bg-gray-50 dark:bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
              <li>
                <a
                  href="/dashboard"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/dashboard/problemset"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  ProblemSet
                </a>
              </li>
              <li>
                <a
                  href="/dashboard/contests"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Contests
                </a>
              </li>
              <li>
                <a
                  href="/dashboard/submissions"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Submissions
                </a>
              </li>
              <li>
                <a
                  href="/dashboard/leaderboard"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Leaderboard
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
