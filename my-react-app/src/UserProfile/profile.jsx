import Navbar from "../nav"
import Footer from "../footer"
export default function Profile() {
    return (
      <>
      <Navbar/>
        <div className="flex flex-col md:flex-row p-6 bg-gray-100 pt-32 pb-10">
          <nav className="w-full md:w-1/4 bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700">Manage My Account</h2>
            <ul className="mt-4">
              <li><a href="#" className="text-red-500 hover:text-red-600">My Profile</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Address Book</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">My Payment Options</a></li>
            </ul>
            <h2 className="text-lg font-semibold text-gray-700 mt-6">My Orders</h2>
            <ul className="mt-4">
              <li><a href="#" className="text-gray-600 hover:text-gray-800">My Returns</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">My Cancellations</a></li>
            </ul>
            <h2 className="text-lg font-semibold text-gray-700 mt-6">My WishList</h2>
          </nav>
        
          <div className="w-full md:w-3/4 bg-white p-6 shadow-md rounded-lg ml-0 md:ml-4">
            <h1 className="text-2xl font-bold text-black">Welcome! Your Name!</h1>
            <h2 className="text-lg font-semibold text-red-500 mt-4">Edit Your Profile</h2>
        
            <form className="mt-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600" htmlFor="first-name">First Name</label>
                <input type="text" id="first-name" className="mt-1 block w-full border border-gray-300 rounded-md p-2" placeholder="First Name" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600" htmlFor="last-name">Last Name</label>
                <input type="text" id="last-name" className="mt-1 block w-full border border-gray-300 rounded-md p-2" placeholder="Last Name" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600" htmlFor="email">Email</label>
                <input type="email" id="email" className="mt-1 block w-full border border-gray-300 rounded-md p-2" placeholder="Info@HighEnd.com" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600" htmlFor="address">Address</label>
                <input type="text" id="address" className="mt-1 block w-full border border-gray-300 rounded-md p-2" placeholder="Kingston, 5236, United States" />
              </div>
        
              <h3 className="text-lg font-semibold text-red-500 mt-6">Password Changes</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600" htmlFor="current-password">Current Password</label>
                <input type="password" id="current-password" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600" htmlFor="new-password">New Password</label>
                <input type="password" id="new-password" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600" htmlFor="confirm-password">Confirm New Password</label>
                <input type="password" id="confirm-password" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
              </div>
        
              <div className="flex justify-end mt-6">
                <button type="button" className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-md px-4 py-2 mr-2">Cancel</button>
                <button type="submit" className="bg-red-500 text-white hover:bg-red-600 rounded-md px-4 py-2">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
        <Footer />
        </>
    )
}
