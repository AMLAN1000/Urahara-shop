import React, { useContext } from 'react'
import myContext from '../../context/data/myContext'
import Layout from '../../components/layout/Layout'
import Loader from '../../components/loader/Loader'

function Order() {
  const userid = JSON.parse(localStorage.getItem('user')).user.uid
  const context = useContext(myContext)
  const { mode, loading, order } = context
  
  const isDark = mode === 'dark'
  
  return (
    <Layout>
      {loading && <Loader />}
      
      <div className="container mx-auto px-4 py-10">
        <h1 className={`text-3xl font-bold mb-8 text-center ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Your Orders
        </h1>
        
        {order.length > 0 ? (
          <div className="space-y-8">
            {order
              .filter(obj => obj.userid === userid)
              .map((orderItem, orderIndex) => (
                <div key={orderIndex} className={`rounded-lg shadow-lg overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                  <div className={`p-4 border-b ${isDark ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}>
                    <div className="flex justify-between items-center">
                      <h2 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        Order #{orderIndex + 1}
                      </h2>
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {new Date().toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {orderItem.cartItems.map((item, itemIndex) => (
                      <div key={itemIndex} className="p-6 flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-1/4 flex-shrink-0">
                          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
                            <img 
                              src={item.imageUrl} 
                              alt={item.title} 
                              className="h-full w-full object-cover object-center hover:opacity-75 transition-opacity"
                            />
                          </div>
                        </div>
                        
                        <div className="flex flex-col justify-between flex-grow">
                          <div>
                            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {item.title}
                            </h3>
                            <p className={`mt-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                              {item.description}
                            </p>
                          </div>
                          
                          <div className="mt-4 flex items-end justify-between">
                            <div className={`text-lg font-medium ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                              ৳{item.price}
                            </div>
                            <div className="flex space-x-2">
                              <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${isDark ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
                                Purchased
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <div className={`text-6xl mb-4 ${isDark ? 'text-gray-600' : 'text-gray-300'}`}>
              📦
            </div>
            <h2 className="text-2xl font-semibold text-blue-500 mb-2">No Orders Found</h2>
            <p className={`text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              You haven't placed any orders yet. Start shopping to see your orders here!
            </p>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Order