const Message = ({ variant, children }) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-100 text-green-800'
      case 'danger':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-blue-100 text-blue-800'
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className={`p-4 rounded ${getVariantClass()}`}>{children}</div>
    </div>
  )
}

export default Message
