module.exports.console_log_pass = function (text){ console.log('\x1b[36m%s\x1b[0m', text); };  
module.exports.console_log_fail = function (text){ console.log('\x1b[1;31m%s\x1b[0m', text); }; 
module.exports.console_log_warn = function (text){ console.log('\x1b[1;33m%s\x1b[0m', text); }; 
