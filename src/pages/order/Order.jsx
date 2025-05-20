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
      
      <div className="container mx-auto px-4 py-10 max-w-5xl">
        <h1 className={`text-4xl font-bold mb-10 text-center ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Your Orders
        </h1>
        
        {order.length > 0 ? (
          <div className="space-y-10">
            {order
              .filter(obj => obj.userid === userid)
              .map((orderItem, orderIndex) => (
                <div 
                  key={orderIndex} 
                  className={`rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border ${
                    isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                  }`}
                >
                  <div className={`p-5 border-b ${isDark ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}>
                    <div className="flex justify-between items-center">
                      <h2 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        Order #{orderIndex + 1}
                      </h2>
                      <div className="flex items-center space-x-3">
                        <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          {new Date().toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                          isDark ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'
                        }`}>
                          Completed
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {orderItem.cartItems.map((item, itemIndex) => (
                      <div 
                        key={itemIndex} 
                        className="p-6 flex flex-col md:flex-row gap-6 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-200"
                      >
                        <div className="w-full md:w-1/4 flex-shrink-0">
                          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 shadow-md">
                            <img 
                              src={item.imageUrl} 
                              alt={item.title} 
                              className="h-full w-full object-cover object-center hover:opacity-90 transition-opacity"
                            />
                          </div>
                        </div>
                        
                        <div className="flex flex-col justify-between flex-grow">
                          <div>
                            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {item.title}
                            </h3>
                            <p className={`mt-3 text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                              {item.description}
                            </p>
                          </div>
                          
                          <div className="mt-6 flex items-end justify-between">
                            <div className="flex flex-col">
                              <div className={`text-lg font-medium ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                                ৳{item.price}
                              </div>
                              {item.quantity && item.quantity > 1 && (
                                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                  Qty: {item.quantity}
                                </span>
                              )}
                            </div>
                            <div>
                              <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                                isDark ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                              }`}>
                                Purchased
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className={`p-4 ${isDark ? 'bg-gray-850 border-t border-gray-700' : 'bg-gray-50 border-t border-gray-200'}`}>
                    <div className="flex justify-between items-center">
                      <div className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Order Total
                      </div>
                      <div className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        ৳{orderItem.cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 rounded-xl shadow-lg overflow-hidden bg-white dark:bg-gray-800 border dark:border-gray-700">
            <div className="text-7xl mb-6">
              📦
            </div>
            <h2 className="text-2xl font-semibold text-blue-500 mb-3">No Orders Found</h2>
            <p className={`text-center max-w-md px-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              You haven't placed any orders yet. Start shopping to see your orders here!
            </p>
            
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Order