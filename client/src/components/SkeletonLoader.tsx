import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  count?: number;
}

export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-white rounded-2xl overflow-hidden shadow-md ${className}`}>
      <div className="relative h-48 overflow-hidden bg-gray-200 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
      </div>
      <div className="p-6 space-y-3">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3" />
        <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-8 bg-gray-200 rounded animate-pulse w-24" />
          <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 8 }: SkeletonProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <SkeletonCard />
        </motion.div>
      ))}
    </div>
  );
}

export function SkeletonHero() {
  return (
    <div className="relative bg-gradient-to-br from-gray-200 to-gray-300 text-white py-12 sm:py-16 lg:py-20 overflow-hidden animate-pulse">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="h-8 bg-gray-300 rounded-full w-48 mx-auto" />
          <div className="h-16 bg-gray-300 rounded w-3/4 mx-auto" />
          <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto" />
          <div className="flex justify-center gap-4 pt-4">
            <div className="h-12 bg-gray-300 rounded-full w-40" />
            <div className="h-12 bg-gray-300 rounded-full w-40" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonCategory() {
  return (
    <div className="group relative rounded-2xl overflow-hidden shadow-md">
      <div className="aspect-[4/3] sm:aspect-square bg-gray-200 animate-pulse" />
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
        <div className="h-6 bg-gray-300 rounded w-24 mb-1" />
        <div className="h-4 bg-gray-300 rounded w-16" />
      </div>
    </div>
  );
}

export function SkeletonText({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="h-4 bg-gray-200 rounded animate-pulse"
          style={{ width: `${Math.random() * 40 + 60}%` }}
        />
      ))}
    </div>
  );
}
