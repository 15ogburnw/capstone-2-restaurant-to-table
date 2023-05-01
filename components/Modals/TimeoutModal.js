import { useEffect, useReducer } from "react";

// Modal popup window to be shown when an important request times out. The idea is to prompt the user for the option to try again or go back. I may or may not end up
// implementing this
export default function TimeoutModal({ maxRefreshAttempts = 3 }) {
  let [refreshes, setRefreshes] = useState(0);
  const router = useRouter();
  const refreshHandler = useCallback(() => {
    setRefreshes(refreshes++);

    if (refreshes >= maxRefreshAttempts) {
      const maxReached = new Error(
        `Unable to connect after the maximum of ${maxRefreshAttempts} attempts to reload the page. Please try again later`,
        {
          cause: {
            code: "maxAttempts",
          },
        }
      ).status(400);
      throw maxReached;
    }
  }, [maxRefreshAttempts, refreshes]);

  useEffect(() => {}, []);

  return <></>;
}

// TODO: NEED TO BUILD OUT THIS WHOLE MODAL
