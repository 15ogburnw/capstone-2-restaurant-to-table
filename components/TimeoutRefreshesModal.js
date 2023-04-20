import { useEffect } from "react";

export default function TimeoutRefreshes({ maxRefreshAttempts = 3 }) {
  let [refreshes, setRefreshes] = useState(0);
  const refreshesHandler = useCallback(() => {
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
    }
    throw maxReached;
  }, [maxRefreshAttempts, refreshes]);

  useEffect(() => {});

  return <></>;
}

// TODO: NEED TO BUILD OUT THIS WHOLE MODAL
