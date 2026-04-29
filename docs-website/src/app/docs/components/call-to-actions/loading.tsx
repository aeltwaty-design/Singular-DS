export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="animate-pulse space-y-8">
        {/* Breadcrumb skeleton */}
        <div className="h-6 w-32 bg-neutral-200 dark:bg-neutral-800 rounded" />
        
        {/* Header skeleton */}
        <div className="space-y-4">
          <div className="h-10 w-64 bg-neutral-200 dark:bg-neutral-800 rounded" />
          <div className="h-6 w-96 bg-neutral-200 dark:bg-neutral-800 rounded" />
        </div>

        {/* Content skeleton */}
        <div className="space-y-6">
          <div className="h-64 bg-neutral-200 dark:bg-neutral-800 rounded-xl" />
          <div className="h-64 bg-neutral-200 dark:bg-neutral-800 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

