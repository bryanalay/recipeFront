
const PostCommentSkeleton = () => {
  return (
    <div className="m-6">
      <h2 className="text-lg font-semibold mb-3">Comentarios</h2>
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-200 animate-pulse"
          >
            <div className="flex items-center mb-2">
              {/* Avatar skeleton */}
              <div className="w-8 h-8 rounded-full bg-gray-300 mr-3" />
              {/* Nombre skeleton */}
              <div className="h-4 w-24 bg-gray-300 rounded" />
            </div>
            {/* Contenido skeleton */}
            <div className="h-3 w-full bg-gray-300 rounded mb-2" />
            <div className="h-3 w-2/3 bg-gray-300 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostCommentSkeleton