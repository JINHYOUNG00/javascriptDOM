/**
 *	jsondata.js 
 */

const employees = `[{"id":1,"first_name":"Jarib","last_name":"Rispine","email":"jrispine0@upenn.edu","gender":"Male","salary":3992},
{"id":2,"first_name":"Wiatt","last_name":"O'Hanley","email":"wohanley1@live.com","gender":"Male","salary":4450},
{"id":3,"first_name":"Suzanna","last_name":"Emnoney","email":"semnoney2@ted.com","gender":"Female","salary":4507},
{"id":4,"first_name":"Noelani","last_name":"De Vries","email":"ndevries3@shareasale.com","gender":"Female","salary":3033},
{"id":5,"first_name":"Dennis","last_name":"Roomes","email":"droomes4@pagesperso-orange.fr","gender":"Male","salary":4144},
{"id":6,"first_name":"Alfred","last_name":"Gamell","email":"agamell5@clickbank.net","gender":"Male","salary":4180},
{"id":7,"first_name":"Alanson","last_name":"Shemming","email":"ashemming6@simplemachines.org","gender":"Male","salary":3166},
{"id":8,"first_name":"Allegra","last_name":"Vahey","email":"avahey7@g.co","gender":"Female","salary":4414},
{"id":9,"first_name":"Grover","last_name":"Swainston","email":"gswainston8@cnet.com","gender":"Male","salary":3117},
{"id":10,"first_name":"Kyrstin","last_name":"Antosch","email":"kantosch9@blogs.com","gender":"Female","salary":4357},
{"id":11,"first_name":"Tove","last_name":"Pragnell","email":"tpragnella@tumblr.com","gender":"Female","salary":4042},
{"id":12,"first_name":"Dame","last_name":"Roakes","email":"droakesb@epa.gov","gender":"Male","salary":4926},
{"id":13,"first_name":"Hillery","last_name":"Boundey","email":"hboundeyc@illinois.edu","gender":"Male","salary":4675},
{"id":14,"first_name":"Lianne","last_name":"De Metz","email":"ldemetzd@unc.edu","gender":"Female","salary":4219},
{"id":15,"first_name":"Antons","last_name":"Krysztofiak","email":"akrysztofiake@ucoz.com","gender":"Male","salary":4002},
{"id":16,"first_name":"Ashia","last_name":"O'Luney","email":"aoluneyf@163.com","gender":"Female","salary":3384},
{"id":17,"first_name":"Amitie","last_name":"Jiroutka","email":"ajiroutkag@bloglovin.com","gender":"Female","salary":4817},
{"id":18,"first_name":"Ernie","last_name":"Budden","email":"ebuddenh@istockphoto.com","gender":"Male","salary":4067},
{"id":19,"first_name":"Ed","last_name":"Salmons","email":"esalmonsi@imgur.com","gender":"Male","salary":4343},
{"id":20,"first_name":"Isak","last_name":"Heintzsch","email":"iheintzschj@github.io","gender":"Male","salary":4411}]`;


console.log(employees);
const empList = JSON.parse(employees); // 문자열 -> 객체.
console.log(empList);