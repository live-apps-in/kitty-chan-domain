const globalErrorHandler = (error: Error) => {
  console.error(
    `\x1b[31m[ ${new Date()} ] Unhandled Exception: ${error.stack}\x1b[0m\n`,
  );
};

process.on('uncaughtException', globalErrorHandler);
process.on('unhandledRejection', globalErrorHandler);
