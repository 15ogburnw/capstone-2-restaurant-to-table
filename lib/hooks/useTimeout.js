const { useEffect, useState, useCallback } = require("react");

const useTimeout = (interval = 10000, maxRefreshAttempts = 3) => {
  let [timeout, setTimeout] = useState(false);

  const timeoutHandler = useCallback(() => {
    const timer = setInterval(() => {
      setTimeout(true);
      const err = new Error(
        "We apologize! Something went wrong on our end. Would you like to try again?",
        {
          cause: {
            code: "Server Error",
          },
        }
      ).status(500);
      throw err;
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [interval]);

  try {
    useEffect(() => {
      timeoutHandler();
    }, [timeoutHandler]);
  } catch (error) {
    // TODO: NEED TO TAKE CARE OF ERROR HANDLING HERE
    console.log(error, error.cause, error.status);
    throw error;
  }

  return { refresh, error };
};

export default useTimeout;
