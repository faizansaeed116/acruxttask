let logger = log.noConflict();
let sender = remote.noConflict();

const customJSON = log => ({
    msg: log.message,
    level: log.level.label,
    stacktrace: log.stacktrace
});

logger.enableAll();

sender.apply(logger, { format: customJSON, url: '/log/logger' });
