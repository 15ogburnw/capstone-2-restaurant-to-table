export default function SearchResults({ children }) {
  return (
    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
        {children}
      </tbody>
    </table>
  );
}
