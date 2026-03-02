const ProjectSkeleton = () => {
  return (
    <>
      <div className="px-4 py-8">
        <div className='animate-pulse rounded-[2.5rem] bg-white dark:bg-slate-900/95 p-5 shadow-lg ring-1 ring-slate-200/50 dark:ring-slate-800/50 backdrop-blur-xl h-full'>
          <div className='mb-6 w-full h-56 rounded-[2rem] bg-slate-200 dark:bg-slate-800' />
          <div className='px-1 space-y-3'>
            <div className='h-4 bg-slate-200 dark:bg-slate-800 rounded-full w-3/4' />
            <div className='h-3 bg-slate-100 dark:bg-slate-800/50 rounded-full w-full' />
            <div className='h-3 bg-slate-100 dark:bg-slate-800/50 rounded-full w-5/6' />
          </div>
          <div className='flex items-center gap-3.5 border-t border-slate-100 dark:border-white/5 pt-5 mt-8'>
            <div className='w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800' />
            <div className='flex-1 space-y-2'>
              <div className='h-2 bg-slate-100 dark:bg-slate-800/50 rounded-full w-12' />
              <div className='h-3 bg-slate-200 dark:bg-slate-800 rounded-full w-24' />
              <div className='h-2 bg-slate-100 dark:bg-slate-800/50 rounded-full w-20' />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectSkeleton
