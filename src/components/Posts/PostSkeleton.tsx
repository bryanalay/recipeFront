
const PostSkeleton = () => {
  return (
    <div className='bg-white shadow-md rounded-lg p-5 mb-4 animate-pulse'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 items-center'>
        <div>
          <div className='relative'>
            <div className='w-full h-64 bg-gray-200 rounded-md'></div>
            <div className='absolute bottom-0 w-full bg-gray-300 h-2 rounded-b-md'></div>
          </div>
        </div>
        <div className='flex flex-col space-y-3'>
          <div className='h-6 bg-gray-200 rounded w-3/4'></div>
          <div className='h-4 bg-gray-200 rounded w-full'></div>
          <div className='h-4 bg-gray-200 rounded w-5/6'></div>
          <div className='h-4 bg-gray-200 rounded w-2/3'></div>
        </div>
      </div>
    </div>
  )
}

export default PostSkeleton