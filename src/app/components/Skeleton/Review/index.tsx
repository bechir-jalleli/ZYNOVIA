const ReviewSkeleton = () => {
  return (
    <div className="p-3">
      <div className='animate-pulse overflow-hidden bg-white/95 dark:bg-slate-900/95 p-6 rounded-[2rem] border border-slate-200/80 dark:border-white/5 shadow-lg backdrop-blur h-full min-h-[160px]'>
        <div className='flex items-center gap-4 mb-5'>
          <div className='w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800' />
          <div className="space-y-2">
            <div className='h-3 w-24 bg-slate-200 dark:bg-slate-800 rounded-full' />
            <div className='h-2.5 w-16 bg-slate-100 dark:border-white/5 rounded-full' />
          </div>
        </div>
        <div className='space-y-2.5'>
          <div className='h-2 w-full bg-slate-100 dark:bg-slate-800/50 rounded-full' />
          <div className='h-2 w-full bg-slate-100 dark:bg-slate-800/50 rounded-full' />
          <div className='h-2 w-3/4 bg-slate-100 dark:bg-slate-800/50 rounded-full' />
        </div>
        <span className='sr-only'>Chargement des témoignages...</span>
      </div>
    </div>
  )
}

export default ReviewSkeleton
