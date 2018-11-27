var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console,
{
  colorize: true
});

logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client(
{
  token: auth.token,
  autorun: true
});

bot.on('ready', function(evt)
{
  logger.info('Connected');
  logger.info('Logged in as: ');
  logger.info(bot.username + ' - (' + bot.id + ')');
});

//Game init
//var maxLimit = 100;
//var clockVal = new array(maxLimit); 
//var clockName = new array(maxLimit);

//Init game and variables. 
var clockVal = [];
var clockName = [];
var contactBio = []; 
var contactName = []; 
var diceLog = [];
var clockVal;
var martinChar;
var jaydenChar;
var joshChar;
var seraphsHitList = '';
initGame();

bot.on('message', function(user, userID, channelID, message, evt)
{
  // Our bot needs to know if it needs to execute a command
  // for this script it will listen for messages that will start with `!`
  if (message.substring(0, 1) == '!')
  {
    var args = message.substring(1).split('');
    //var cmd = args[0];
    var input = '';
    var param = '';
    var clockNameTemp = '';
    var clockNameIndexTemp = '';
    var updateClockCheck = false;

    //Gets input and stores as string, spaces included.
    for (var i = 0; i < args.length; i++)
    {
      input += args[i];
    }

    var inputTest = getInput(input); //Grabs input command, ignores #onwards.
    var lowerInput = inputTest.toLowerCase(); //Lower case, useful for comparing. Consider moving till later to store names with capitals.
    //console.log('input'); //Test input statement
    //console.log(lowerInput);

    var check = checkParam(fixInput(input)); //Checks if input has param.

    if (check == true)
    {
      //creates param (reads after #) Could consolidate more. 
      var tempInput = fixInput(input); //Easier to check with.
      var paramNormal = getParam(input); //Needed to store names with spaces
      param = getParam(tempInput);
      param = param.toLowerCase();

    }

    //args = args.splice(1) //Not sure what this does.
    lowerInput = fixInput(lowerInput); //Npt meeded now, fixInput was broken.
    //console.log(lowerInput);
    //console.log('lowerInput');
    //console.log(lowerInput +'123');
    //console.log('param');
    //console.log(param);

    switch (fixInput(lowerInput)) //Mostly basic switch statement, Case -> some output. could modify such message = "" and output at end.
    {
      case 'ping':
        {
          bot.sendMessage(
          {
            to: channelID,
            message: 'Pong!'
          });
          break;
        }
      case 'martin':
        {
          bot.sendMessage(
          {
            to: channelID,
            message: martinChar
          });
          break;
        }
     case 'dicelog':
	 case 'rolllog': 
	 {
		 var msg='';
		for(var i=2; i<13; i++)
		{
			msg += i+' has occured: '+diceLog[i]+'\n';
		}
		 bot.sendMessage(
          {
            to: channelID,
            message: msg
          });
		  break;
	} 
      case 'commands':
      case 'command':
      case 'c':
      case 'list':
	  case 'help':
        {
          //Need to update when new terms are added. 
		  var msg='';
		  msg +='**ping** - basic test, returns pong.\n!name (!martin) - returns players character infromation.\n**clocks** -List all clocks.\n**new clock #name** - Creates a new clock with at 1200.\n ';
		  msg += '**clock Name** cycles clock or **clock Name #time** to set to a certain time.\n**declare a contact #Name: bio** - Creates new contact, needs format of #name:bio to store correctly\n**contact** - lists contact information,\n**roll/!dice** - Returns a random number (1-12).\n**dicelog** - Returns tally of dice results.\n!fuck me up - Rolls harm.\n';
		  msg +='**drive** -gives link to google drive with Sprawl docs.\n**save** - outputs contacts, clocks to console.\n**term** - Returns term information\n';
          bot.sendMessage(
          {
            to: channelID,
            message: msg
          }); 
		
		  msg ='**Stats:** Cool, Edge, Meat, Mind, Style, Synth\n';
		  msg+='**Player Moves:** Assess, Play hard ball, Mix it up, Research, Fast talk, Hit the street, \n';
	      msg +='**Ohter Moves** MC moves, ,Act under pressure, Mix it up, Get the Job, Get paid, gitalonglittledoggie,\n';
		  msg += '**General terms:** Forward, Ongoing, Hold, Harm, Playbook\n';
		  msg+= '**Other moves:** Apply first aid, Acquire Agricultural Property/Am I dead, Links/Interfere, Under the knife/New cyberware\n';
		  msg+= '**Driver:** Wheels, Second skin, Chromed, Daredevil, Drone jockey,Hot shit driver, Eye in the sky, Hot shit driver.\n';
		  msg+= '**Fixer:** Hustling, Surveillance, Dept collection, Pettey theft, Deliveries, Brockering deals, Technical work, Pimping, Addictive substances, I know people, Backup, Balls in the air, Chromed, Deal of a lifetime, Facetime, Hard to find, Reputation, Sales engineer, Smooth, Street kingpin, Word on the street.\n';
		  bot.sendMessage(
          {
            to: channelID,
            message: msg
          }); 
		  
		  msg ='**Hacker:** Jack in, Console cowboy, Black ice vet, Chromed, Ice breaker, Neural scars, Programming on the fly, Rep, Search Optimisation, Tech support, Zeroed\n';
		  msg += '**Hunter:** Ear to the ground, It all fits together, Big game hunter, Chromed, Deadbeat, Enhance, Eye for detail, Human terrain, On the trail, See the angles, Sniper\n';
		  msg +='**Infiltrator:** Covert entry,  Cat burglar, Face, Assassin, Case the joint, Chromed, Jack in move, Master of disguise, Mother duck, Plan B, Psychological warefare, Stealth Operative\n';
		  msg += '**Killer:** Custom weapon, Emotionless, Hard, Loaded for bear, More machine than meat, Corperate secrets, Military background, Mil specs, Serious badass, Trained eye\n';
		  msg +='**Pusher:** Driven, Vision thing, Believers, Bring it home, Chromed, Famous, Inner circle, One million points of light, Opportunistic, People person, Rabble rouser, Silver tongue\n';
		  msg+= ' **Reporter:** Live and on the air, Nose for a story, Gather evidence, 24/7 live feeds, Chromed, Filthy assistants, Monstering, Press pass, Reliable sources, War correspondent,\n';
		  msg += '**Soldier:** Heres the plan, I love it when a plan comes together, Aura of professionalism, Chromed, Corporate knowledge, Exit stategy, Hands-on management, Recruiter, Slippery, Steady presence, Tactoca; operations\n';
		  msg += '**Tech:** Expert(list specifics will work solo), Storage, Customiser, Analytic, Blend in,Bypass,Chromed, Diverse interests, Jack of all trades, Obssessive, On it, Renaissance man\n';
		  msg += '**Ice:** Ice, Blue ice, Red ice, Black ice, Specialised ice, Login, Compromise secuirty, Melt, Manipulate systems, Jackout,\n';
		 // msg+= '**Cyberware**: Cyberears, Cybercoms, Cyberarm, Cyberlegs, Dermal Plating, Implant Weaponary, Muscle Grafts, Neural Interface, Synthetic Nerves, Skillwires, Tactical Computer\n';
		    bot.sendMessage(
          {
            to: channelID,
            message: msg
          }); 
		break;}

      case 'josh':
        {
          bot.sendMessage(
          {
            to: channelID,
            message: joshChar
          });
          break;
        }
      case 'jayden':
        {
          bot.sendMessage(
          {
            to: channelID,
            message: jaydenChar
          });
          break;
        }
      case 'clocks':
	  case 'clock':
        {
          var clockMes = listClocks();
          bot.sendMessage(
          {
            to: channelID,
            message: clockMes
          });
          break;
        }
      case 'dice':
      case 'roll dice':
      case 'dice roll':
      case 'roll':
      case 'lets do this':
        {
		 var diceMes = rollDice();
          bot.sendMessage(
          {
            to: channelID,
            message: diceMes
          });
          break;
        }
		
		case 'diceloop1':
		{ 
		  var temp = rollDice();		
		  bot.sendMessage(
          {
            to: channelID,
            message: '!diceloop2'
          });break;
		}
		case 'diceloop2':
		{ 
		  var temp = rollDice();		
		  bot.sendMessage(
          {
            to: channelID,
            message: '!diceloop1'
          }); break;		
		}
      case 'fuckmeup':
      case 'fuckit':
        {
          //Ensures a bad roll. 
          var dice = Math.floor((Math.random() * 6) + 1);
		  dice += Math.floor((Math.random() * 6) + 1);

		  var diceMes ='';
		  if(dice >= 10)
		  {
			diceMes = 'You\'re fucked! Choose 1:\n';
			diceMes += '•You\'re out of action: unconscious, trapped, incoherent or panicked\n';
			diceMes += '•Take the full harm of the attack, before it was reduced by armour; if you already took the full harm of the attack, take +1-harm\n';
			diceMes +='•Lose the use of a piece of cyberware until you can get it repaired\n';
			diceMes +='•Lose a body part (arm, leg, eye)';
		  }
		  else if ((dice>= 7 )&&(dice<= 9))
		  {
			  diceMes ='The MC will choose 1.\n';
			  diceMes +='•You lose your footing\n';
			  diceMes +='•You lose your grip on whatever you’re holding\n';
              diceMes += '•You lose track of someone or something you’re attending to\n';
              diceMes += '•Someone gets the drop on you';
		  }
		  else 
		  {
			diceMes = 'Safe this time, you managed to roll a '+dice+'.';  
		  }
          bot.sendMessage(
          {
            to: channelID,
            message: diceMes
          });
          break;

        }
      case 'drive':
      case 'rules':
        {
          var url = 'https://drive.google.com/drive/u/0/folders/1AxSL7Hwc-iPTY2vSyMMneME6yITKrO3k?fbclid=IwAR2QiQYCPiK9Ioh9bMl7AIlRva0dPS8iVn2JllOYlHpQ28aUwIKCdiiQxNk';
          bot.sendMessage(
          {
            to: channelID,
            message: url
          });

          break;
        }
      case 'save':
        {
          //saves to console. Code will need to manually be edited to recall. Consider save to file(need to do)
          var nameSave;
		  var clockNameSave = '//Clock Names\n';
		  var clockTimeSave = '//Clock Values\n';
		  var contactNameSave = '//Contact Names\n';
		  var contactBioSave = '//Contact Bio\n';

          for (var i = 1; i < clockName.length; i++)
          {
            clockNameSave += 'clockName[' + i + '] = \'' + clockName[i] + '\'; \n';
            clockTimeSave += 'clockVal[' + i + '] =\' ' + clockVal[i] + '\'; //'+clockName[i] +' \n';
          }
		  for (var i =1; i<contactName.length; i++)
			{
				contactNameSave += 'contactName['+i+'] = \''+ contactName[i]+'\';\n';
				contactBioSave += 'contact['+i+'] =\' '+contactBio[i]+'\';// '+contactName[i]+ '\n';
			}
			var consoleMsg = '@SAVE START\n'+clockNameSave+'\n'+clockTimeSave+'\n'+contactNameSave+'\n'+contactBioSave+'\n@SAVE END'
		 console.log(consoleMsg);
		 /*	bot.sendMessage(
          {
            to: channelID,
            message:clockNameSave
          });
		bot.sendMessage(
          {
            to: channelID,
            message:clockTimeSave
          });
		  	bot.sendMessage(
          {
            to: channelID,
            message:contactNameSave
          });
		  	bot.sendMessage(
          {
            to: channelID,
            message:contactBioSave
          });
		 */
		 
          bot.sendMessage(
          {
            to: channelID,
            message: 'saved'
          });

          break;
        }

      case 'newclock':
      case 'NewClock':
      case 'Newclock':
        { //Creates new clock using normal input (with spaces) from param. One case its nicer than C++ without needing to use vectors or pointers.
          var a;
          a = clockName.length; // Inital clock size is 4 (0,1,2,3) getting size will be next index location new clock in S4 then s5 (0,1,2,3,4)
          //a=+1; // initial clock is S=4(0,1,2,3), newS will have index location 
          clockName[a] = paramNormal; //Should assign param defined by user. Note that the the clock name will be lower input by default.
          clockVal[a] = '1200';
          var clockMesTemp = 'New clock, ' + clockName[a] + ' with time set to ' + clockVal[a];
          bot.sendMessage(
          {
            to: channelID,
            message: clockMesTemp
          });
          break;
        }
		case 'declarecontact':
		case 'declareacontact':
		case 'newcontact':
		case 'iknowaguy':
		case 'newcotnact':
		{
			var a;
            a = contactName.length;
			if (paramNormal != null)
            {
				contactName[a] = getContactName(paramNormal);
				contactBio[a] = paramNormal; //Should assign param defined by user. Note that the the clock name will be lower input by default.
				var contMess= 'New contact has been added.';
			}
			else
			{
				contMess = 'Please input new contact as "!I know a guy # name: bio, ie Black: is a blank that knows YOUR NAME HERE'; 
			}
			bot.sendMessage(
          {
            to: channelID,
            message: contMess
          });
		  break;

		}
		
		case 'contactBio':
		case 'contact': 
		case 'contacts': 
		{
			//var contMess = '________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________\n';
			var contMess = ''; 
			for (var i =1; i<contactBio.length; i++)
			{
				contMess += contactBio[i] + '\n'; // ______________________________________________________________________________\n';
			}
			 bot.sendMessage(
            {
            to: channelID,
            message: contMess
          });
			
			break;
		}
      case 'looptime':
        {
          //var loopMes = messageLoop(param);
          bot.sendMessage(
          {
            to: channelID,
            message: '!looptime'
          });
          break;

        }
      case 'waleed':
        {
          bot.sendMessage(
          {
            to: channelID,
            message: waleedChar
          });
          break;

        }
		case 'seraphshitlist':
		case 'hitlist':
		{
			bot.sendMessage(
          {
            to: channelID,
            message: seraphsHitList
          });
			break;
		}
		case 'fuckthepolice':
		case 'fuckedthepolice':
		case 'policearedead':
		{
			seraphsHitList += 'Looks like Serpah has taken revenge on the Police, good job\n';
				bot.sendMessage(
          {
            to: channelID,
            message: seraphsHitList
          });
		  break;
		}
		case 'fuckTony':
		case 'fuckedTony':
		case 'tonydead':
		case 'tonysdead':
		case 'tonyisdead':
		{
			seraphsHitList += 'Serpah must have killed Tony. Good fuck Tony.\nert';
				bot.sendMessage(
          {
            to: channelID,
            message: seraphsHitList
          });
		  break;
		}
		
		case 'fucksyntaxTerror':
		case 'fuckedsyntaxTerror':
		case 'Syntaxterrordead':
		case 'syntaxterrorisdead': 
		{
			seraphsHitList += 'Seraph might have killed Syntax Terror but more than likely Syntax Terror died from something else. Either way Syntax Terror is off the hitlist now\n';
				bot.sendMessage(
          {
            to: channelID,
            message: seraphsHitList
          });
		  break;
		}

      default:
        {
			//console.log(lowerInput);
			//console.log(paramNormal); 
          //As clock name as ambigious and not predefined(all cases) couldnt be in switch so manual loop though array for match is done.
          var clockStorage;
		  var updateContact = false;
          clockStorage = clockName.length+1;
          for (var i = 1; i <= clockStorage; i++)
          {
            //console.log('i and clockName')
            //console.log(i);
            //console.log(clockName[i]);
            //console.log('--------');
            var tempClock = "" + clockName[i];
            //tempClock.toString();

            //console.log(tempClock);
            tempClock = fixInput(tempClock);
            tempClock = tempClock.toLowerCase();
            //tempClock = fixInput(tempClock.toString());
            //tempClock= fixInput(tempClock);
            if (lowerInput == fixInput(tempClock))
            {
              clockNameTemp = lowerInput;
              clockNameIndex = i;
              updateClockCheck = true; //allows either update clock or proceeed in other default cases. 
              //i =100000;
            }
          }
		  for (var i = 1; i<contactName.length+1; i++)
			{
			var tempCont = "" + contactName[i];

            tempCont = fixInput(tempCont);
            tempCont = tempCont.toLowerCase();
				
				if (lowerInput ==  fixInput(tempCont))
				{
					if (paramNormal == null)
					{
						clockUpdateMessage = contactBio[i];
					}
					else 
					{
						contactBio[i]+= paramNormal;
						clockUpdateMessage = contactName[i] + ' updated.'; 
					}
					updateContact = true;
				}
			}
          if (updateClockCheck == true)
		  {
			  if ((param =='1200')||(param =='1500')||(param=='1800')||(param =='2100')||(param =='2200')||(param =='2300')||(param =='0000'))
			  {
				  clockVal[clockNameIndex] = paramNormal;
            var clockUpdateMessage = clockName[clockNameIndex] + ' clock is now ' + clockVal[clockNameIndex];
            bot.sendMessage(
            {
              to: channelID,
              message: clockUpdateMessage
            });
          }
		  else 
			 {
			  //1500 | 1800 | 2100 | 2300|00:00
            clockVal[clockNameIndex] = updateClock(clockVal[clockNameIndex]);
            var clockUpdateMessage = clockName[clockNameIndex] + ' clock is now ' + clockVal[clockNameIndex];
            bot.sendMessage(
            {
              to: channelID,
              message: clockUpdateMessage
            });
            //break;
		  }   
		  }
		  else if (updateContact == true)
		  {
			  bot.sendMessage(
            {
              to: channelID,
              message: clockUpdateMessage
            });
			  break;
		  }
          else //Looks up help table. 
          {
            defMes = helpGame(lowerInput);
            bot.sendMessage(
            {
              to: channelID,
              message: defMes
            });

          }
        }

    }

  }
  //no longer needed unless conflicting terms with clock name, char name etc. 
  else if (message.substring(0, 1) == '#')
  {
    //var cmd = args[0];
    var args = message.substring(1).split(' ');
    var input = '';
    for (var i = 0; i < args.length; i++)
    {
      input += args[i];
    }
    var lowerInput = input.toLowerCase();
    var helpMes = helpGame(lowerInput);
	console.log(helpMes);
    bot.sendMessage(
    {
      to: channelID,
      message: helpMes
    });
  }
})

function initGame()
{
  //Load Values otherwise preset.
  
 //Clock Names
clockName[1] = 'Skorpios';
clockName[2] = 'Tremere';
clockName[3] = 'Lucio Gang';
clockName[4] = 'The Business';
clockName[5] = 'Police Force';
clockName[6] = 'Medtech';
clockName[7] = 'legwork';
clockName[8] = 'mission';
clockName[9] =  'The Thing';
clockName[10] = 'Seraph';

//Clock Values
clockVal[1] = '1500'; //Skorpios
clockVal[2] = '0000'; //Tremere
clockVal[3] = '1800'; //Lucio Gang
clockVal[4] = '2100'; //The Business
clockVal[5] = '2200'; //Police Force
clockVal[6] = '2200'; //Medtech
clockVal[7] = '1200'; //legwork
clockVal[8] = '1200'; //mission
clockVal[9] = '1500'; // The Thing
clockVal[10] = '0000';//SERAPh
	

  for (var i = 0; i < clockName.length; i++)
  {
    if (clockVal[i] == null)
    {
      clockVal[i] = '1200';
    }
  }

  //Character information. Consider moving or something. 
  martinChar = 'Name : Christof Romuald. \n Looks: Unhinged eyes, Weathered face, Augmented body, Artifical skin, corperate wear\n';
  martinChar += 'Cyberware: Synthetic Nerves, Muscle Grafts, Neural Interface with Targetting Suite\n';
  martinChar += 'Moves: More machine than meat, Git along little dogie\n';
  martinChar += 'Other: Has pet attack dog called Waleed. Waleed also has a Neural Interface.';
  jaydenChar = 'Name: Syntax Terror\nLooks:Focused Eyes, Plain face, Thin body,Utility wear\nCyberware: Cyber Arm with implant tools\nMoves: Expert - Breadboarder, Customizer, Bypass'; 
  //\nBut if you must know I\'m Syntax Terror, I hack and tinker with things using my cyberarm and deck, and most likely have fucked your mum.';
  //joshChar = "Ayyy LMAO infiltrated the system you got nothing on me, Seraph";
  waleedChar = "Simon Jerkof, anything else really need to be said?";
  joshChar = 'Name: Seraph \nLooks: Dark eyes, calm face, slim body, asian skin, military wear\n';
  joshChar +='Cyberware: Synthetic Nerves\nMoves: Cat Burgler, case the joint.';
  
//Contact Names
contactName[1] = 'Maxine Watcher';
contactName[2] = 'Adam';
contactName[3] = 'Thug';
contactName[4] = 'James';
contactName[5] = 'Jeremire';
contactName[6] = 'Nisei';
contactName[7] = 'Elena';
contactName[8] = 'Khan';
contactName[9] = 'John Smith';
	
	//Contact Bio
 contactBio[1] = 'Maxine watcher is alligned and works at Tremere. Maxine recruited Seraph, Syntax and Christof for some securtty recon for Tremere. Thanks to Maxine Christof is no longer owned by Tremere.';// Maxine Watcher;
 contactBio[2] = 'Adam is a freelance reporter  that Christof knows. Adam is known to be given scopes of  events so he is one of the first on the scene. Christof has given Adam some information in the past to help him be one of the first on the scene.';// Adam;
 contactBio[3] = 'Thug is a driver/racer, Syntax Terror has helped Thug tinker with his ride in the past.Thug is often found at the tracks racing and tries to avoid confrontation when Corps are involved. Also has a hover car.Hates warzones.'; // Thug;
 contactBio[4] = 'James: Seraph knows James, James does0 intelligence. James is a nice guy.'; // James;
 contactBio[5] = 'Jeremire: Seraph knows them as an ops manager that owed favour for helping with a botched mission which is now repayed after help getting out of jail.';// Jeremire;
 contactBio[6] = 'Nisei is a hacker that knows Christof. Christof helped clear some unwanted attention on Nisei in the past. Nisei helped Christof when Waleed was captured by Medtech.';// Nisei;
 contactBio[7] = 'elena:Fence Serpah knows';//elena;
 contactBio[8] = 'Khan: Vet Christof knows. Healed Chirstof up,  Now needs help from Christof(-1 on going)';// Khan;
 contactBio[9] = 'John Smith: Some military guy H4KKK3R knows';// John Smith;
  
  
  
  
  for(var i = 1; i<=12; i++)
  {
	diceLog[i] =0;  
  }
  
  

		seraphsHitList = 'After watching the death of Christof Seraph has sworn revenge on:\n'
		seraphsHitList += 'The police, or at least the ones that killed Christof.\n'
		seraphsHitList += 'Some guy named Tony that set us up when it was \'simple above board mission\'\n';
		seraphsHitList += 'Syntax Terror and his drones.\n';
  
  }

//Basic cycle through clocks. Consider adding !clock #time to change. 
function updateClock(clockVal)
{
	if (clockVal === '1200')
  {
    clockVal = '1500';
  }
  else if (clockVal === '1500')
  {
    clockVal = '1800';
  }
  else if (clockVal === '1800')
  {
    clockVal = '2100';
  }
  else if (clockVal === '2100')
  {
    clockVal = '2200';
  }
   else if (clockVal === '2200')
  {
    clockVal = '2300';
  }
  else if (clockVal === '2300')
  {
    clockVal = '0000';
  }
  else if (clockVal === '0000')
  {
    clockVal = '1500';
  }
  else
  {
    clockVal = '1500';
  }

  return clockVal;

}

//lists all clocks within array and their values.
function listClocks()
{
  var clockList = '';
  for (var i = 1; i< clockName.length; i++)
  {
	var clockBar='';
	clockBar += '' + clockDisplay(clockVal[i]);
	//console.log('i ='+i+' clockVal='+clockVal[i]+'clockbar: ' + clockBar);
    clockList +='**'+ clockName[i] + '** is at ' + clockVal[i] + '. '+clockBar;
	//console.log('i:'+i+' clockslist:' +clockList);
  }
  return clockList;
}

function clockDisplay(str)
{
	var clockBar ='';
	switch(str)
	{
	case'1200':
	{clockBar = ' □□□□ □□□□ □□□□ □ □ □ \n'; break;}
	case'1500':
	{clockBar = ' ■■■■ □□□□ □□□□ □ □ □ \n'; break;}
	case'1800':
	{clockBar = ' ■■■■ ■■■■ □□□□ □ □ □ \n'; break;}
	case'2100':
	{clockBar = ' ■■■■ ■■■■ ■■■■ □ □ □ \n'; break;}
	case'2200':
	{clockBar = ' ■■■■ ■■■■ ■■■■ ■ □ □ \n'; break;}
	case'2300':
	{clockBar = ' ■■■■ ■■■■ ■■■■ ■ ■ □ \n'; break;}
	case'0000':
	{clockBar = ' ■■■■ ■■■■ ■■■■ ■ ■ ■ \n'; break;}
	default:
	{clockBar = '□□□□ □□□□ □□□□ □ □ □ \n'; break;}
	}
	return clockBar;
}

var paramTemp;
//switch lookup , if not found log in console to add later. Either text or typo correction. 
//Need to update term when things are added.
//Could be moved to other switch case. Kept here for older format of "!help # term". 
function helpGame(paramTemp)
{
  var msg=''; 
  switch (paramTemp)
  {
	  case 'cool':
      {
        msg = 'COOL to remain calm and focused in stressful situations';
        break;
      }
    case 'edge':
      {
        msg = 'EDGE to draw on your street-smarts and experience or give the impression that you are a badass';
        break;
      }
    case 'mind':
      {
        msg = 'MIND to think your way out of a problem through logic, instinct, creativity or any other mental process';
        break;
      }
    case 'style':
      {
        msg = 'STYLE to handle a situation with charisma, presence or nerve';
        break;
      }
    case 'synth':
      {
        msg = 'SYNTH to interface seamlessly with technology';
        break;
      }
    case 'meat':
      {
        msg = 'MEAT to use your physical talents without the aid of cyberware to overcome a problem';
        break;
      }
case 'assess':
{
msg ='Assess (Edge)\n';
msg +='When you closely study a person, place or situation, or you quickly size up an opponent or a charged situation, roll Edge.\n'
msg+='10+: gain 3 hold\n';
msg+='7-9: gain 1 hold\n\n';
msg+='In the ensuing action, you may spend 1 hold at any time to ask the MC a question from the list below if your examination could have revealed the ';
msg+='answer. The MC may ask you questions to clarify your intent. Take +1 forward when acting on the answers.\n';
msg+='• What potential complication do I need to be wary of?\n';
msg+='• What do I notice despite an effort to conceal it?\n'
msg+='• How is ______ vulnerable to me?\n';
msg+='• How can I avoid trouble or hide here?\n';
msg+='• What is my best way in/way out/way past?\n';
msg+='• Where can I gain the most advantage?\n';
msg+='• Who or what is my biggest threat in this situation?\n';
msg+='• Who or what is in control here?\n';
break;
}

case 'actunderpressure':
{
 msg ='When you race against the clock, act while in danger or act to avoid danger, roll Cool.\n';
msg +='10+: you do it, no problem\n';
msg += '7-9: you stumble, hesitate, or flinch: the MC will offer you a worse outcome, hard bargain, or ugly choice';
msg += '6- MC makes a move.';
 break;
}
case 'forward':
{
msg ='Some moves will grant you a bonus Forward (“take +1 forward”); in this case add one to the next move roll you make.\n'; 
msg+= 'Some moves tell you to take +1 forward to a particular move or type of roll (such as “take +1 forward to mix it up” or “take +1 forward when ';
msg+='acting on the answers”) so you only add one to a roll if it occurs under the conditions described. If you don’t use your +1 forward immediately, write it down, including any restrictions on its use.';
break;
}
case 'ongoing':
{
msg ='Some moves will grant you an Ongoing bonus (“take +1 ongoing until...”); add one to each relevant roll as long as the condition applies. This bonus may also be ';
msg +='limited to a move or fictional situation (such as “takes +1 ongoing while you act on an assigned task” or “take +1 ongoing to fast talk”). If you get a +1 ongoing, write';
msg+='it down, including any restrictions on its use and when it ends.';
break;
}

case 'hold':
{
msg= 'Other moves will grant you hold, a currency which you can spend later for various effects described the move which gives it to you. When you gain hold, note down ';
msg+='how much you have and where it comes from. For example a Hacker who rolls her console cowboy move might write down “Console Cowboy, 3 hold”. Don’t forget to ';
msg +=' mark it off as you use it.';
break;
}

case 'mcmoves':
{
msg ='The MC gets to make a move when:\n';
 msg += 'a player misses a move\n'; 
 msg +='the players are waiting for something to happen\n';
 msg+= 'the fiction demands it.\n';
msg+='Moves can be soft – giving the players a chance to avoid bad consequences – or hard – imposing immediate consequences on the players. Hard and soft is not a binary. Instead, MC moves fall on a continuum with hard and soft as the end points.\n';
break;
}
case 'christof':
case 'ripchristof':
case 'rememberchristof':
case 'whodied':
{
	var dice = Math.floor((Math.random() * 11) + 1);
	switch (dice)
	{
		case 1:{msg = 'Remember that time Christof tackled a Robot Synth thing to save Seraph?';break;}
		case 2:{msg = 'Remember that time Christof said he wasn\'t going to bring Waleed but did but never used him?';break;}
		case 3:{msg = 'Remember that time Christof forgot Waleed in a drug den and Waleed got picked up the Police and Medtech?';break;}
		case 4:{msg = 'Remember when Christof didn\'t use Waleed to sniff for a bomb then dived in front of Maxine when it exploded?'; break;}
		case 5:{msg = 'Hopefully Waleed isn\'t nearby because thinking of Christof just made him sad'; break;}
		case 6:{msg = 'Remember that time Christof was doubting that Syntax Terror was a junkie, whilest Syntax Terrror had no pants on in a drug den?'; break;}
		case 7: {msg = 'That time Christof brutally killed a bunch of goons all at once with his barehands' ;break; }
		case 8: {msg ='Christof tried tackling armored Poilce aiming Shotguns, ended well';break;}
		case 9: {msg = 'Christof went to a Vet for serious medical attention, have you?';break; }
		case 10: {msg = 'Remember when Christof chucked H4KKK3R out of the way when a building came tumbling down';break}
		case 11: {msg='You seem a little distracted thinking of Christof, I suggest the MC make you take -1 forward for being distracted.';break}
		default: {msg = 'Now\s not the time to remember the dead.'; break;}
	}
	break; 
	
}
case 'applyfirstaid':
    case 'first aid':
      {

        msg = 'When you treat someone’s wounds using appropriate medical equipment, roll Cool.\n';
        msg += '10+: if their Harm Clock is at 2100 or less, reduce their harm by two segments. If their Harm Clock is at more than 2100, reduce their harm by one segment\n';
        msg += '7-9: reduce their harm by one segment. If their Harm Clock is still at more than 2100, they take -1 ongoing until they receive proper medical attention\n';
        msg += 'Once a character has been given first aid, more first aid will not heal them further until they suffer harm again. First aid cannot heal missing body parts or damaged cyberware. To fix those problems, you’ll need to make a deal with someone. Trauma Derms are appropriate medical equipment for wounds at 2100 or less, more serious wounds require an EMT kit.';
		break;
      }
	  
	  
	  case 'playhardball':
	  case 'hardball':
	  case 'playball':
	  {
	  msg = 'When you get in someone’s face threatening violence and you intend to carry through, roll Edge.\n';
msg +='10+: NPCs do what you want. PCs choose: do what you want, or suffer the established consequences\n';
msg+='7–9: For NPCs, the MC chooses 1:\n';
 msg+='they attempt to remove you as a threat, but not before suffering the established consequences\n';
 msg+='they do it, but they want payback. Add them as a Threat\n';
msg +='they do it, but tell someone all about it. Advance the appropriate Mission Clock\n';
msg +='PCs choose: do what you want, or suffer the established consequences. They gain +1 forward to act against you';
	  break;
	  }
	  
	  case 'acquireagriculturalproperty':
	  case 'amidead':
	  case 'imfucked':
	  case 'fuckingkillmealready':
	  case 'killme':
	  {
	  msg ='When you hit 0000 on your Harm Clock, roll Meat.\n';
msg +='10+: you survive until the medics arrive\n';
msg+='7-9: you survive at a cost. Pick one: +owned, substandard treatment (-1 to a stat), cyberware damage (give one piece of cyberware a negative tag)\n';
msg+='6-: you bleed out on the street\n';
msg +='Sooner or later, your character’s number will come up, and that number will be 0000.\n';
msg+='Depending on the circumstances, that may mean death, but it may also mean EMTs';
msg+=' and hospitalisation. At that point it comes down to your character’s relationship to ';
msg +='the corporation who owns that medical facility or the local street doc. For the MC, ';
msg += 'this is an opportunity to introduce complications. Tie the character’s treatment into ';
msg +='an established corporation or faction or introduce a new player. Hook the injured ';
msg +='character with contracts, threats, cybernetic implants, addictive drugs, or antidotes. ';
msg+'Corporations care about leverage, not legality or morality.' ;
	  
	  break;
	  }
	  
	  case 'mixitup':
	  {
	  msg ='When you use violence against an armed force to seize control of an objective, state that objective and roll Meat.\n';
msg+= '7+: you achieve your objective\n';
msg+='7-9: choose 2:\n';
msg += 'you make too much noise. Advance the relevant Mission Clock\n';
msg+= 'you take harm as established by the fiction\n';
msg+= 'an ally takes harm as established by the fiction\n';
msg += 'You can’t tailor your objective so that you avoid the consequences of your choice on a 7-9 result. If doing something quietly is an explicit part of the objective you might succeed, but be discovered after or during the action for some other reason, if you choose you make too much noise. If not being detected is important to you, don’t choose that option.';
	  break;
	  }

	  case 'research':
      {
        msg = 'When you investigate a person, place, object, or service using a library, dossier or database (or combination of them), ask a question from the list below and roll Mind.\n';
        msg += '10+: take [intel]; the MC will answer your question and answer a follow-up question from this list as well:\n';
        msg += 'Where would I find ______?\n';
        msg += 'How secure is ______?\n';
        msg += 'Who or what is related to ______?\n';
        msg += 'Who owned or employed ______?\n';
        msg += 'Who or what is ______ most valuable to?\n';
        msg += 'What is the relationship between ______ and ______?\n';
        msg += '7-9: take [intel]; the MC will answer your question\n';
        msg += '6-: the MC will answer your question... and make a move\n';
        break;
      }
    case 'fasttalk':
	case 'fasttal': 
      {
        msg = 'When you try to convince someone to do what you want with promises, lies or bluster, roll Style.\n';
        msg += '10+: NPCs do what you want. PCs choose whether to do it or not. If they do, they mark experience. If they don’t, they must act under pressure to go against your stated wishes.\n';
        msg += '7-9: NPCs do it, but someone will find out: the MC will advance the appropri- ate Countdown Clock. For PCs choose one:\n';
        msg += 'If they do what you want, they mark experience\n';
        msg += 'If they don’t do it, they must act under pressure to go against your stated wishes\n';
        break;
      }
	  
	  case 'hitthestreet':
      {
        msg = 'When you go to a Contact for help, roll Style.\n';
        msg += '7+: You get what you want.\n';
        msg += '10+: You get a little something extra (choose either [intel] or [gear]).\n';
        msg += '7-9: choose 2 from the list below:\n';
        msg += 'Your request is going to cost you extra\n';
        msg += 'Your request is going to take some time to put together\n';
        msg += 'Your request is going to attract unwanted attention, complications orconsequences\n';
        msg += 'Your contact needs you to help them out with something. If you turn them down take -1 ongoing to this move till you make it right\n';
        break;
      }
	  case 'interfere':
	  case 'links':
	  case 'link':
      {
        msg = 'When you help or hinder another character, roll Links with them.\n';
        msg += '7+: On a hit they take +1 or -2 forward, your choice\n';
        msg += '7-9: you are implicated in the results of the other character’s move and may expose yourself to danger, retribution, or cost\n';
        break;
      }
	  case 'undertheknife':
    case 'newcyberware':
	case 'goundertheknifwe': 
	case 'goundertheknife':
      {
        msg = 'When you have new cyberware installed by a street doctor, roll Cred spent (max +2).\n';
        msg += '10+: the operation was a complete success\n';
        msg += '7-9: the cyberware doesn’t work as well as advertised, choose one: +unreli-able, +substandard, +hardware decay, +damaging.\n+damaging: sometimes it hurts like hell and eventually it will do permanent nerve damage \n+hardware decay: it works now, but it’s just a matter of time... \n+substandard: it works, but not as well as it should \n+unreliable: sometimes it doesn’t work\n';
        msg += '6-: there have been... complications';
        break;
      }
	  
	    case 'getthejob':
      {
        msg = 'When you negotiate the terms of a job, roll Edge.\n ';
        msg += '10+: choose 3 from the list below\n';
        msg += '7-9: choose 1 from the list below\n';
        msg += 'the employer provides useful information [intel]\n';
        msg += 'the employer provides useful assets [gear]\n';
        msg += 'the job pays well\n';
        msg += 'the meeting doesn’t attract attention\n';
        msg += 'the employer is identifiable\n';
		
		msg+= 'Missing (6-) this move means either that the employer remains in control of the flow of knowledge and payment, or when they slip and give away additional information it reveals additional complications for the characters.';
        break;
      }
	  
	      case 'getpaid':
      {
        msg = 'When you go to a meet to get paid by your employer, roll and add the number of unfilled segments on the Legwork Clock.\n';
        msg += '10+: choose 3 from the list below\n';
        msg += '7-9: choose 1 from the list below\n';
        msg += 'it’s not a set-up or an ambush\n';
        msg += 'you are paid in full\n';
        msg += 'the meeting doesn’t attract the attention of outside parties\n';
        msg += 'the employer is identifiable\n';
        msg += 'you learned something from the mission; everyone marks experience\n';
		break;
        }
		
		case 'harm':
		{
		msg ='It’s a dangerous world out there, especially in your line of work. When you suffer harm (even 0-harm or s-harm) lower the harm suffered by the level of your armour (if any), fill in a number of segments on your Harm Clock equal to the remaining harm, and roll harm suffered.\,';
msg+= '10+: choose 1:\n';
msg += 'You’re out of action: unconscious, trapped, incoherent or panicked\n';
msg+= 'Take the full harm of the attack, before it was reduced by armour; if you already took the full harm of the attack, take +1-harm\n';
msg+= 'Lose the use of a piece of cyberware until you can get it repaired\n';
msg+= 'Lose a body part (arm, leg, eye)\n';
msg+='7-9: the MC will choose 1:\n';
 msg+='You lose your footing\n';
msg+='You lose your grip on whatever you’re holding\n';
 msg+= 'You lose track of someone or something you’re attending to\n';
msg+='Someone gets the drop on you.';
		break;
		}
		
case 'classes':
case 'class':
case 'playbook':
{
 msg = 'The DRIVER plugs her car into her brain and roars off in a cloud of fumes and drones\n';
msg += 'The FIXER hooks people up with gear, jobs, friends, and trouble\n';
msg += 'The HACKER glides through computer networks taking what the job requires,and more\n';
msg+= 'The HUNTER searches the streets for whatever or whoever needs finding\n';
msg+= 'The INFILTRATOR is a master of getting into secure places and doing bad things there\n';
msg +='The KILLER uses bleeding edge technology to commit violence\n';
msg+= 'The PUSHER wants to change the world, one mind at a time\n';
msg += 'The REPORTER uncovers the truth and exposes the guilty\n';
msg += 'The SOLDIER plans and executes missions in the corporate wars\n';
msg += 'The TECH is the master of gear: building it, fixing it, and breaking it\n';
break;
}
case 'hesgood,butsoami':
case 'soami':
case'he\'sgood,butsoami':
case 'hesgoodbutsoami':
{
 msg = 'He’s good, but so am I.\n';
msg +='When you attempt to outwit a sentient opponent in The Matrix, roll Edge:\n';
msg +='7+ you temporarily evade/escape/overcome your opponent\n';
msg +='10+ gain 1 hold. Spend this to temporarily evade/escape/overcome your opponent at any other time in this run.\n';
msg += '6- your opponent gets the better of you.';
break;
}

case 'nosefortrouble':{
msg = 'Nose for trouble\n';
msg +='When you want to use Waleed to Assess a person, place or thing, justify why dog senses are better than yours and roll Cool (or +1 Synth if you both have Neural Interface).\nOn a hit, gain +1 additional hold.';
break;
}
case 'wheels':
case 'wheel':
{
 msg = 'Wheels: You start with a cyber-linked vehicle. If your vehicle has Power+2, it may start with one mounted weapon system. To build your vehicle:\n';
msg +='Choose a Frame: motorcycle, car, hovercraft, boat, vectored-thrust panzer, fixed-wing aircraft, helicopter, amphibious\n';
msg+= 'Choose a Design: racing, recreational, passenger transport, cargo, military, luxury, civilian, commercial, courier\n';
msg+= 'Choose a Profile:\n';
 msg += 'Power+2, Looks+1, Weakness+1; 1-Armour\n';
 msg+= 'Power+2, Looks+2, Weakness+1; 0-Armour\n';
 msg += 'Power+1, Looks+2, Weakness+1; 1-Armour\n';
  msg+= 'Power+2, Looks+1, Weakness+2; 2-Armour\n';
msg +='For each point of Power, choose a strength; For each point of Looks, choose a look; For each point of Weakness, choose a weakness. If your vehicle has Power+2, it may mount one weapon system; Military vehicles may mount an additional weapon system.\n';
msg +='• Strengths: fast, quiet, rugged, aggressive, huge, off-road, responsive, uncomplaining, capacious, workhorse, easily repaired\n';
msg +='• Looks: sleek, vintage, pristine, powerful, luxurious, flashy, muscular, quirky, pretty, garish, armoured, armed, nondescript\n';
msg +='• Weaknesses: slow, fragile, sloppy, lazy, cramped, picky, guzzler, unreliable, loud\n';
msg +='• Weapons: Machine guns (3-harm near/far area loud messy autofire), grenade launchers (4-harm near/far area loud messy), missile launcher (5-harm far area messy breach), autocannon (4-harm near/far area messy breach\n';
break;
}
case 'secondskin':
{
msg = 'Second Skin: When jacked in through your Neural Interface to a cyber-linked vehicle:\n';
msg = '• when you act under pressure, roll Cool + your car’s power\n';
msg = '• if you mix it up, roll Synth (instead of Meat) + your car’s power\n';
msg = '• if you play hardball, roll Edge + your car’s looks\n';
msg = '• if you help or interfere with someone, roll Links + your car’s power\n';
msg = '• if someone interferes with you, add your car’s weakness to their roll (in addition to their links)\n';
break;
}
case 'chromed':
{
msg ='Chromed: Choose another piece of cyberware at character creation or in downtime. Describe how you got it and paid for it the same as you did for your first piece of cyberware.';
break;
}
case 'daredevil':
{
msg ='Daredevil: When you drive straight into danger without hedging your bets, you get +1 armour. If you take one or more harm, mark experience.';
break;
}
case 'dronejockey':
{
msg = 'Drone jockey: You start with two drones. For each:\n Choose a motive style: rotor, fixed-wing, quadruped, octoped, tracked, wheeled, aquatic, amphibious, submarine\n';
msg +='Choose a frame:\n';
msg += 'Tiny (insect-sized): +small, +fragile, +stealthy, pick one sensor\n';
msg+= 'Small (rat- to cat-sized): choose one strength, one sensor, one weakness, and one other from any category\n';
msg+= 'Medium (dog-sized): choose one strength, one sensor, one weakness, and two others from any category\n';
msg+= 'Large (bear-sized): +obvious, choose two strengths, one sensor, one weakness and two others from any category\n';
msg+= 'Strengths: fast, rugged, off-road, responsive, uncomplaining, easily repaired,\n';
msg+= 'stealthy, tight encryption, autonomous, robot arm, armed, satellite relay\n';
msg+= 'Sensors: magnification, thermographic, jamming, image enhancement,\n';
msg+= 'analysis software, sonar, medical\n';
msg+= 'Weaknesses: slow, fragile, unreliable, loud, loose encryption, obvious\n';
msg+= 'Armed: a weapon can be mounted on the drone. The size of the weapon is determined by the size of the frame.\n';
msg+= '• A small drone can mount a gun dealing 2- or s-harm with a range tag of close or less and without the autofire tag\n';
msg+= '• A medium drone can mount a gun dealing up to 3-harm with a range\n';
msg+= 'tag of near or less\n';
msg+= '• A large drone can mount a gun dealing up to 5-harm\n';
break;
}
case 'eyeinthesky':
{
msg ='Eye in the sky: When helping or interfering while piloting a drone, roll Edge instead of Links.';
break;
}
case 'hotshitdriver':
{ 
msg = 'Hot shit driver: When you’re driving a cyber-linked vehicle in a high-pressure situation, roll Edge.\n';
msg+= '10+: gain 3 hold\n';
msg+= '7-9: gain 1 hold\n';
msg+='You may spend 1 hold to do one of the following:\n';
msg+='• Avoid one external danger (a rocket, a burst of gunfire, a collision, etc)\n';
msg+='• Escape one pursuing vehicle\n';
msg+='• Maintain control of the vehicle\n';
msg+='• Impress, dismay or frighten someone\n';
msg+='Iceman: When you try to fast talk someone, roll Cool.\n';
msg+='Right tool for the job: You have two additional cyber-linked vehicles (build each using the same method as your custom vehicle).\n';
msg+='Sweet ride: When you hit the street in your vehicle, roll Style + your vehicle’s Looks.\n';
break;
}
case 'wordonthestreet':
{
msg ='Word on the street: When you research by listening to or recalling street level gossip, take an additional [intel], even on a miss.\n';
break;
}
case 'sreetkingpin':
{
msg ='Street kingpin: +1 crew and choose a new job.';
break;
}
case 'smooth':
{
msg = 'Smooth: When you help or interfere with someone, roll Style instead of Links.';
break;
}
case 'salesengineer':
{
msg = 'Sales engineer: You’ve demonstrated the use of just about every piece of gear available on the street. When you produce equipment, take +1 forward with that piece of gear if you use it immediately.';
break;
}
case 'repuation':
{
msg ='Reputation: When you meet someone of consequence who might have heard of you, roll Edge. On a hit, say what they know about you. On a 10+, take +1 forward with them. On a miss, the MC will decide what they’ve heard about you, if anything. Either you or the MC can say whether someone is “of consequence”, but once you’ve made the reputation move on someone, they’re “of consequence” and will be a recurring part of the story.';
break;
}
case 'hardtofind':
{
msg ='Hard to find: You keep a low profile and actively avoid the people you owe. When you hit the street and roll a 7-9, choose one fewer result.';
break;
}
case 'facetime':
{
msg ='Facetime: When you engage someone in face to face conversation without intervening technology, take +1 forward to fast talk them.';
break;
}
case 'dealofalifetime':
{
msg='Deal of a lifetime: When you hit the street to sell something and roll a 7-9, choose one fewer result.';
break;
}
case 'ballsintheair':
{ msg ='Balls in the air: +1 crew and choose a new job.'; break;}
case 'protection':
{ msg = 'Protection: Your associates have your back. Disaster: Your associates have pissed off the wrong people';
break;
}

case 'backup':
{
msg = 'Backup: You have a group of “associates” who provide security. This is a small gang of 5-10 hired thugs (2-harm +small +employees 1-armour). Pick 2:\n';
msg = '• Your associates are well armed: add 1 harm\n';
msg = '• Your associates are well armoured: add 1 armour and +obvious\n';
msg = '• Your associates are ex-military: add +disciplined\n';
msg = '• Your associates are more than muscle to you: replace +employees with +loyal\n';
msg = '• Your associates have bikes or a couple of other vehicles: add +mobile\n';
msg = '• You have a large group of associates (15-30): replace +small with +medium \nGain the following job, and +1 crew:';
break;
}
case 'iknowpeople':
{
msg ='I know people: Once per mission you may introduce a new Contact. Name the contact, say what they do, then roll Style.\n';
msg += '10+: you’ve worked with the contact before; they have talent. Write them down as a Contact\n';
msg +='7-9: you’ve never met them before, they’re an unknown quantity\n';
msg +='6-: you know them all right. Tell the MC why they dislike you\n';
msg +='After you’ve rolled, describe how you contact them; the MC will ask some questions.';
break;
}
case 'hustling':
{
msg ='Hustling: You have people who work for you in various ways. You start with 2-crew and two jobs from the list below. Between missions, choose a number of those jobs equal to or less than your current crew, describe what each job is, and roll Edge.\n';
msg +='10+: you profit from each of your jobs\n';
msg +='7-9: one of them is a Disaster and you Profit from the rest\n';
msg +='6-: everything’s FUBAR. The MC will make a move based on the Disaster for each job';
break;
}
case 'surveillance':
{ msg = 'Surveillance: You have a small network of informants who report on events; you then sell that information\n';
msg+= '• Profit: gain [intel]\n';
msg+= '• Disaster: someone acts on bad info';
break;
}
case 'deptcollection':
{
msg = 'Debt collection: You have a few burly looking fuckers who collect outstanding debts\n';
msg+= '• Profit: gain [gear]\n';
msg+= '• Disaster: someone’s out of pocket\n';
break;
}
case 'pettytheft':
{
msg='Petty theft: You have a small crew who perform minor local robberies\n';
msg+= '• Profit: gain [gear]\n';
msg+= '• Disaster: they robbed the wrong guy';
break;
}

case 'deliveries':
{
msg ='Deliveries: People hire you to transport things and you have a driver who takes care of that\n';
msg+= '• Profit: gain 1 Cred\n';
msg+= '• Disaster: the delivery never arrives\n';
break;
}
case 'brokeringdeals':
{
msg ='Brokering deals: You arrange for the right people to meet each other\n';
msg+= '• Profit: gain 1 Cred\n';
msg+= '• Disaster: the deal that you arranged goes wrong\n';
break;
}
case 'techinicalwork':
{
msg ='Technical work: You have a couple of techs whom you supply with work\n';
msg+= '• Profit: gain [gear]\n';
msg+= '• Disaster: something bad happens to someone else’s property\n';
break;
}
case 'pimping':
case 'pimp':
{msg=' Pimping: You manage a small stable of physical or virtual sex workers\n';
msg+= '• Profit: gain [intel]\n';
msg+= '• Disaster: something goes wrong with a customer \n';
break;
}
case 'addictivesubstances':
{
msg ='Addictive substances: You manage a small lab producing either drugs or simstim chips\n';
msg+= '• Profit: gain [intel]\n';
msg+= '• Disaster: something goes wrong for a user or for the lab itself';
break;
}

case 'consolecowboy':
{
msg =' Console cowboy: When you connect to a secure system, roll Mind.\n';
msg +='10+: gain 3 hold\n';
msg+= '7-9: gain 1 hold\n';
msg += 'While in that system, you may spend 1 hold for any of the following effects:\n';
msg += '• Prevent a construct from triggering an alert\n';
msg += '• Avoid an ICE routine executed against you, your deck, or your programs\n';
msg += '• Increase your hold over compromised security or manipulated systems by 1';
break;
}

case 'blackicevet': 
{
msg =' Black ICE vet: When Black ICE executes a routine against you, the MC only chooses two options.';
break;
}
case 'icebreaker':{
msg =' ICE breaker: You know how to disable ICE quickly and quietly. Once per Matrix run you may cancel a routine executed against you, your deck, or your programs.';
break;}
case 'neuralscars':{
msg =' Neural scars: you have 1-armour against Black ICE.';
break;}
case 'programmingonthefly':{
msg =' Programming on the fly: You can adapt your programs to the specific weaknesses of matrix constructs as you encounter them. When you successfully compromise security or manipulate systems, hold +1.\n';
break;}

case 'rep': {
msg =' Rep: When you appear in the Matrix with a recognisable avatar, roll Synth instead of Style for fast talk and instead of Edge for play hardball. When your reputation gets you into trouble, mark experience.\n';
break; }
case 'searchoptimisation':
{
msg =' Search optimisation: When you research a topic in the Matrix, you may always ask a follow up question. On a 10+, take an additional [intel].';
break;}
case 'techsupport':{
msg =' Tech support: When you help a team member while jacked into the matrix, roll Mind instead of Links.';
break;}
case 'zeroid':{
msg ='Zeroid: Your identity is a mystery which you closely guard. Your deck has +2 Stealth.';
break;}

case 'eartotheground':{
msg='Ear to the ground: You have a knack for loosening lips and picking up information. When you circulate among a neighbourhood or a group of people, you may research to gather information.';
break;}
case 'itallfitstogether':{
msg =' It all fits together! You’re a master of making connections between seemingly unrelated events. At the start of a mission, roll Edge.\n';
msg +=' 10+: gain 3 hold\n';
msg +='7-9: gain 1 hold\n';
msg+='As you put everything together during the mission, spend 1 hold at any time to ask a question from the research list.';
break;}

case 'biggamehunter':
{
msg =' Big game hunter: When you spring a trap for a target you have investigated, roll Edge.';
msg+='7+: you have them trapped, the only way out is through you\n'; 
msg +='10+: they are at your mercy; if the target attempts to escape, roll Edge instead of Meat to mix it up\n';
break;
}

case 'deadnbeat':{
msg =' Deadbeat: Everyone knows you only help your friends out when its convenient for you. When you hit the street, you never take the -1 penalty when you avoid your contacts’ problems. You may still select the option that your contact has a problem, and if you do that choice may have fictional effects.';
break;}
case 'enhance':
{
msg =' Enhance: When you examine your gathered evidence, gain [intel] and roll research with Edge instead of Mind.';
break;}
case 'eyefordetail':{
msg =' Eye for detail: You are a master at tailing people and staking out locations. When you perform surveillance on a person or a place, gain [intel] and roll assess.';
break;}
case 'humanterrain':
{
msg =' Human terrain: When you investigate a group and spend [intel], name that group as your target. You gain +1 ongoing while acting against or in pursuit of that group. You may only target one group at a time.';
break;
}
case 'onthetrail':
{
msg =' On the trail: When you want to find someone or something, name your target. When you gain [intel], you may note that it concerns your target. When you spend three such [intel], the MC will describe where your target is; you say how the clues led you to that knowledge and how you have your target or its defenses at a disadvantage.';
break;
}
case 'seetheangles':
{
msg =' See the angles: At the start of the Action Phase, gain [intel] and [gear].';
break;
}
case 'sniper':{
msg =' Sniper: When you set up a covered and concealed place to hide, roll Cool.\n';
msg+='10+: choose 3\n';
msg+= '7-9: choose 2\n';
msg+= '• Your site is well hiddenn\n';
msg+= '• Your site has excellent cover\n';
msg+= '• Your site has an excellent field of view\n';
msg+= '• You have a similarly covered and concealed backup location\n';
msg+= '• Your spot is well secured\n';
msg+= 'Then describe your hide site.\n';
break;
}
case 'covertentry':{	  
msg ='Covert entry: When you attempt to infiltrate a secure area alone, roll Cool.\n';
msg += '10+: gain 3 hold\n';
msg += '7-9: gain 1 hold\n';
msg += 'As the MC describes the infiltration and the security measures you must overcome, you may spend 1 hold to describe how you overcome the obstacle and:\n';
msg += '• Bypass a security system or guard.\n';
msg += '• Disable a security system you have bypassed.\n';
msg += '• Disable a guard.\n';
msg += '• Escape notice.\n';
break;}

case 'catburglar':{
msg =' Cat burglar: You specialise in infiltrating by unconventional access points and manoeuvring through locations by unconventional routes. During your infiltration, you will have opportunity to steal incidental portable items that might be useful later. After you have spent all your covert entry hold infiltrating a secure area through stealth and dexterity, gain [gear].\n';
break;}
case 'face':
{
msg =' Face: You specialise in infiltrating by appearing to belong in places you do not, hiding in plain sight. During your infiltration, you will have opportunity to see or overhear information which might be relevant later. After you have spent all your covert entry hold infiltrating a secure area through charm and social graces, gain [intel].\n';
break;}
case 'assassin':
{
msg =' Assassin: When you attack unexpectedly, ask one question from the assess list for free.\n';
break;}

case 'casethejoint':{
msg =' Case the joint: When you take time to examine a location for security weaknesses you can exploit, roll Edge.\n';
msg += '10+: gain three [intel]\n';
msg += '7-9: gain [intel]\n';
msg += 'You may spend this [intel] in the normal way, or you can spend one point of this [intel] to ask questions from the assess or research lists.\n';
break;}


case 'jackinmove':{
msg =' Jack in: When you’re jacked into the matrix, you have access to the matrix moves in Chapter 8: The Matrix. Note: You need a neural interface and a cyberdeck to make the most of this move. \n';

break;}

case 'masterofdisguise':
{
msg =' Master of disguise: You can sell a persona so well that you set security forces at ease. While you are in disguise and your cover has not been blown, when you roll a 12+ to fast talk you may lower the Action Clock by one segment.';
break;}

case 'motherduck':
case 'quack':{
msg =' Mother duck: When you infiltrate a location you can get your team in as well. When you spend hold to bypass a security system or guard or escape notice, your team may accompany you.';
break;}
case 'planb':{
msg =' Plan B: When shit hits the fan and you have to get out, name your escape route and roll Cool.\n';
msg += '10+: sweet, you’re gone\n';
msg += '7–9: you can go or stay, but if you go it costs you: leave something behind, or take something with you; in either case, the MC will tell you what\n';
msg += '6-: you’re caught in a vulnerable position, half in and half out. The MC will make a move;' 
break;}

case 'psychologicalwarefare':
case 'warfare':{
msg =' Psychological warfare: When you attempt to influence the morale of your enemies by leaving evidence of violence while remaining undetected, roll Edge.\n';
msg += '7+: your enemies are impressed and overly cautious, scared and demoralised, or angry and careless (MC’s choice)\n';
msg += '10+: you choose';
break;}

case 'stealthopperative':
case 'stealthop':
{
msg =' Stealth operative: You have an intuitive sense of how to blend in with the rhythms of a secure area and can take actions that make its security forces feel at ease. When you assess while undetected and roll a 12+, you may spend one hold to lower the Action Clock by one segment.';
break;}

case 'customweapon':{
msg= 'Custom weapon: Choose a base and two options. You may customise an implanted weapon; use the stats of the weapon as the base and add two appropriate options.\n';
msg+= 'Base (choose 1, any firearm can be +linked):\n';
msg+= '• handgun(s) (2 damage close/near loud quick)\n';
msg+= '• shotgun (3 damage close/near loud messy)\n';
msg+= '• rifle (3 damage near/far/ex loud)\n';
msg+= '• blade (2 damage hand)\n';
msg+= '• chain or wire (1 damage close area)\n';
msg+= 'Options (choose 2):\n';
msg+= '• ornate (+valuable)\n';
msg+= '• antique (+valuable +reload)\n';
msg+= '• automatic (+autofire)\n';
msg+= '• silenced (-loud)\n';
msg+= '• hi-powered or weighted (+1 damage)\n';
msg+= '• big or dangerous (+1 damage)\n';
msg+= '• versatile (may inflict s-harm)\n';
msg+= '• ridiculous payload (+breach, +dangerous)\n';
msg+= '• subtle (+discreet, +reload)\n';
msg+= '• +numerous (small weapons only)\n';
msg+= 'When you’ve finished creating your weapon, name it.\n';
break;
}
case 'emotionless':{
msg =' Emotionless: When you play hardball, roll Synth.\n';
break;}
case 'hard':{
msg =' Hard: When you make the harm move, subtract your Meat from your roll.\n';
break;}

case 'loaderforbear':{
msg =' Loaded for bear: choose another custom weapon.\n';
break;}

case 'moremachinethanmeat':{
msg =' More machine than meat: Choose another piece of cyberware at character creation or in downtime. Describe how you got it and paid for it the same as you did your first piece of cyberware.\n';
break;}

case 'corperatesecrets':{
msg =' Corporate secrets: You used to be a Company Man. When you research a corporation, you may always ask a follow up question. On a 10+, take an additional [intel].\n';
break;}

case 'militarybackground':{
msg =' Military background: You still have contacts in the military. When you hit the street for military gear and roll a 7-9, choose one fewer result.\n';
break;}
case 'milspecs':{
msg =' Mil specs: When you mix it up, you count as a small gang.\n';
break;}
case 'seriousbadass':{
msg =' Serious badass: when you enter a charged situation, roll Style.\n';
msg+= '10+: gain 2 hold\n';
msg+= '7–9: gain 1 hold\n';
msg+= 'Spend 1 hold to make eye contact with an NPC present, who freezes or flinches and can’t act until you break it off.\n';
msg+= '6-: your enemies identify you immediately as their foremost threat\n';
break;}

case 'trainedeye':{
msg =' Trained eye: When you evaluate a person, vehicle, drone or gang, roll Cool.\n'
msg+= '7+: ask the target “How are you vulnerable to me?” Take +1 forward when acting on the answer\n';
msg+= '10+: gain +1 ongoing when acting against that target\n';
break;}



case 'driven':{
msg ='Driven: When you begin a mission that furthers your vision, roll Edge.\n';
msg+= '10+: gain 3 hold\n';
msg+= '7-9: gain 1 hold\n';
msg+= 'You may spend 1 hold before rolling any other move to take +1 or -2 forward to the move.\n';
msg =' Vision thing: When you have time and space for an emotional connection with someone and you passionately advocate for your vision, roll Style.\n';
msg+= '10+: gain 2 hold\n';
msg+= '7-9: gain 1 hold\n';
msg+= 'Spend 1 hold to have the targeted NPCs:\n';
msg+= '• give you something you want\n';
msg+= '• do something you ask\n';
msg+= '• fight to protect you or your cause\n';
msg+= '• disobey an order given by someone with authority or leverage over them\n';
msg+= 'When you use this move on a PC, spend your hold to help or interfere as if you had rolled a 10+ (i.e. give them +1 or -2). If you miss against a PC, they gain 2 hold against you which they can use in the same way.\n';
break;
}

case 'believers':{
msg =' Believers: You are part of a gang, tribe, band, corporation or similar group. You can go to them for aid, for resources or to hide out until the heat dies down. As a group, they’re pretty trustworthy, but they will make demands on you in return (your gang counts as a Contact). By default this group has a core of about 20 people as well as various associates and groupies\n';
msg +='What kind of gang is it? Choose one: Street, Corporate, Entertainment/Media, Military, Political\n'; 
msg +='How big is your gang? Choose a size and choose two tags:\n';
msg =' Small: 10 or fewer (loyal, mobile, well-armed, specialists)\n';
msg =' Medium: 20-40 (mobile, well-armed, specialists)\n';
msg =' Large: 50-100 (well-connected, resources, self-sufficient)\n';
msg =' Huge: 200+ (well-connected, resources, spread out, self-sufficient)\n';
msg+= 'Define your gang’s territory. Do they control a few blocks of the streets? Do they operate out of a compound or an arcology?\n';
msg +='Choose one:\n';
msg+= '• poor, wanted, hard to find, unreliable, violent, hated\n';
msg+='Who leads your gang? If your gang is small, you may be the leader. Otherwise,\n';
msg+='choose one:\n';
msg+= '• immoral, demanding, grasping, a real fucker, useless, absent\n';
msg+= 'What are your gang’s main gigs? Choose two:\n';
msg+= '• commerce, crime, parties, muscle, deliveries, entertainment, infiltration, scavenging, activism, politics\n';
break;}

case 'bringithome':{
msg =' Bring it on home: Whenever you ask someone a question with one million points of light, you may ask a follow up question from the list. When you succeed at vision thing, gain 1 extra hold.\n';
break;}


case 'famous':{
msg =' Famous: Your face is well known beyond the narrow scope of your people. Unless you disguise yourself, you will be recognised by many people you meet. If someone recognises you, you take +1 forward against them, but people will find out that you met them. Both you and the MC can declare that someone recognises you.\n';
break;}

case 'innercircle':{
msg =' Inner circle: You have a group of loyal confidantes within your larger circle of believers. This is a small gang of 5-10 believers (2-harm small loyal 1-armour). Pick 2:\n';
msg+= '• Your confidantes are well armed: add +1 harm\n';
msg+= '• Your confidantes are well armoured: +1 armour and +obvious\n';
msg+= '• Your confidantes are ex-military: add +disciplined\n';
msg+= '• Your confidantes have bikes or a couple of other vehicles: add +mobile\n';
msg =' One million points of light: When you successfully advocate for your vision with vision thing, ask one of the following questions. You may spend 1 hold to ask one of the following questions:\n';
msg+= '• What do you wish I’d do?\n';
msg+= '• How are you vulnerable?\n';
msg+= '• Are you telling the truth?\n';
msg+= '• What do you intend to do?\n';
msg+= '• How are you connected to the current events?\n';
msg+= '• What do you most desire?\n';
break;}
case 'opportunistic':{
msg =' Opportunistic: When you help or interfere with someone, roll Edge.\n'; break;}
case 'peopleperson':{
msg =' People person: When you hit the street among people who share your vision and roll a 7-9, choose one fewer result.\n'; 
break;}
case 'rabblerouser':{
msg =' Rabble rouser: You may use vision thing to sway a potentially sympathetic crowd.\n';
break;}
case 'silvertoungue':{
msg =' Silver tongue: When you fast talk someone and roll 7+, you get a little something extra. Take [intel].\n';
break;
}

case 'liveandontheair':
case 'liveonair':{
msg+ 'Live and on the air: When you go live from the scene and broadcast a stream to avoid harm and expose your target, roll Edge.\n';
msg+= '7+: you get the shot you want and are “escorted” to a position of safety\n';
msg+= '7-9: choose one:\n';
msg+= '• Your story irritates your target (The MC will advance a relevant Threat Clock)\n';
msg+= '• Someone on your team gets hurt off camera\n';
msg+= '• Your story angers your employer\n';
msg+= '• Your rushed narrative is misinterpreted by the public with unintended consequences\n';
break;
}
case 'noseforastory':{
msg =' Nose for a story: At the start of a mission, roll Edge.\n';
msg+= '10+: gain 3 hold\n';
msg+= '7-9: gain 1 hold\n';
msg+= 'During the mission, spend 1 hold to invoke one of the following effects:\n';
msg+= '• Ask one question from the research list\n';
msg+= '• Take +1 forward when monstering\n';
msg+= '• Find a piece of evidence that links this mission to a current story; start a Story Clock and a linked Noise Clock or roll to gather evidence\n';
break;}
case 'gatherevidence':{
msg =' Gather evidence: When you gather evidence to break a story, roll Mind.\n';
msg+= '10+: you get the evidence you need, advance that Story Clock\n';
msg+= '7-9: you get the evidence, but tip your hand to someone implicated in your story; tell the MC which clock to advance: a relevant Corporate Clock, the linked Noise Clock or the relevant Mission Clock (Legwork or Action, depending on which phase of the current mission you’re in)\n';
msg+= '6-: the MC will advance the Noise Clock and make a move\n';
msg+= 'If the Story Clock reaches 0000 before the Noise Clock, the Reporter has broken the story before the implicated parties could cover up the evidence, or stop the investigation. The exact implications of this for the game will vary based on the story, but it should have a major impact on the implicated parties and will affect at least one Corporate Clock.\n';
msg+= 'If the Noise Clock reaches 0000 before the Story Clock, the implicated parties have tied up all the loose ends and the story is dead. Now that damage control is complete, they can deal with the Reporter permanently. Advance any relevant Corporate or Threat Clocks.\n';
break;}

case '24/7/livefeeds':
case 'livefeeds':
case'24/7':{
msg =' 24/7 live feeds: When you scan the feeds to research a topic, you may always ask a follow up question. On a 10+, take an additional [intel].\n';
break;}
case 'flithyassistant':{
msg =' Filthy assistants: When you spend [intel] and give mission advice based on your research, your team takes +1 forward to follow that advice and you mark experience.\n';
break;}
case 'monstering':{
msg =' Monstering: When you corner someone and hound them with questions to get to the bottom of a story, roll Edge.\n';
msg+= '10+: they tell you the truth, regardless of the consequences\n';
msg+= '7-9: they give you enough to get you off their back, then when they’re safe, they choose one:\n';
msg+= '• they respond with fear\n';
msg+= '• they respond with anger\n';
msg+= '• they respond with clinical calm\n';
break;}
case 'presspass':{
msg =' Press pass: If you reveal your public persona to fast talk your way in, do not roll the dice, you count as rolling a 10+. Take [intel] and advance the Legwork Clock.\n';
break;}

case 'reliablesources':{
msg =' Reliable sources: When you call your regular sources to research a topic, roll Style instead of Mind.\n';
break;}
case 'warcorrespondent':{
msg =' War correspondent: When acting under pressure while in physical danger, roll Edge instead of Cool.\n';
break;}

case 'herestheplan':{
msg = 'Heres the plan: When you plan a Mission, everyone to whom you assign a task takes +1 ongoing while they act on that task according to the plan. Anyone who rolls a miss or goes off the plan loses their bonus for that mission. If you get paid, mark experience.\n';
break;}
case 'iloveitwhenaplancomestogether':
case 'plantogether':
{
msg =' I love it when a plan comes together: At the start of a mission, roll Edge.\n';
msg+= '10+: gain 3 hold\n';
msg+= '7-9: gain 1 hold\n';
msg+= 'During the mission, spend 1 hold for one of the following effects:\n';
msg+= '• You have that piece of gear that you need, right now\n';
msg+= '• You appear in a scene where you are needed, right now\n';
msg+= '6-: gain 1 hold anyway, but your opponent has predicted your every move; the MC will advance the Legwork Clock\n';
break;}
case 'auraofprofessionalism':{
msg =' Aura of professionalism: When you get the job and try to get paid, choose one extra option, even on a miss.\n';
break;}

case 'corperateknowledge':{
msg =' Corporate knowledge: You used to be a Company Man. When you research a corporation, you may always ask a follow up question. On a 10+, take an additional [intel].\n';
breask;}

case 'exitstrategy':{
msg =' Exit strategy: You always have an escape plan prepared. When shit hits the fan and you decide to bail out, roll Mind.\n';
msg+= '7+: You escape the situation\n';
msg+= '10+: choose one thing to leave behind\n';
msg+= '7-9: choose two things\n';
msg+= '• Your team\n';
msg+= '• A mission objective\n';
msg+= '• Identifiable evidence\n';
msg+= '• Your staked Cred\n';
breask;}

case 'hands-onmanagement':
case'handsonmanagement':
{
msg =' Hands-on management: When you mix it up while directing a mission from the front, roll Mind instead of Meat.\n';
break;}
case 'recruiter':{
msg =' Recruiter: When you attempt to recruit a specialist or a team of specialists to directly assist with your mission, roll Edge.\n';
msg+= '10+: choose 2\n';
msg+= '7-9: choose 1\n';
msg+= '• Reliable professional(s)\n';
msg+= '• A small team (up to 5)\n';
msg+= '• As competent as required\n';
break;}

case 'slippery':{
msg =' Slippery: At the end of a mission during which you planted or hid evidence to shift blame away from you and your team, name who you threw under the corporate bus and roll Edge.\n';
msg+= '7+: the MC will not increase Corporate Clocks in the retaliation phase\n';
msg+= '10+: the MC will reduce a Corporate Clock by one\n';
msg+= '6-: create or increase the Threat Clock of whoever you threw under the bus\n';
break;}

case 'steadypresence':{
msg =' Steady presence: When you give someone a pep talk while in a stressful situation, you help them as if you had rolled 10+.\n';
break;}
case 'tacticaloperations':
case 'tacticalop':{
msg =' Tactical operations: When you assess while leading a mission from the front, hold +1, even if you miss.\n';
break;}

case 'expert':
{msg ='Mechanic, Splicer, Breadboarder, Gunsmith Medic, Pyrotechnician\n';break;}

case 'mechanic':{ 
msg = 'Mechanic: you are an expert in the construction, maintenance and operation of vehicles & drones; you have two drones created according to the Driver move drone jockey\n';
break;}
case 'splicer':{
msg = 'Splicer: you are an expert in cybernetics and biomodification; you may begin with one extra piece of cyberware; describe how you implanted this in yourself, but you need not describe how you paid for it\n';
break;}

case 'breadboarder':{
msg = 'Breadboarder: you are an expert in computers and electronics; you have a cyberdeck with 5 points of ratings (no rating may be higher than 2) and a number of programs equal to its Processor rating+1\n';
break;}

case 'gunsmith':{
msg = 'Gunsmith: you are an expert in armaments; you begin with the Killer move custom weapon\n';
break;}

case 'medic':{
msg = 'Medic: you are an expert in medicine and pharmaceuticals; when you apply first aid, you heal one additional harm segment, even on a miss\n';
break;}

case 'pyrotechnician':{
msg = 'Pyrotechnician: you are an expert in chemistry and explosives; ignore the +dangerous tag for explosives You start with workshops appropriate to your areas of expertise (e.g. surgery, electronics workshop, garage).\n';
break;}

case 'storage':{
msg =' Storage: After receiving a job you may look through your accumulated parts and supplies for equipment that might help with the current mission. Roll Mind.\n';
msg+= '10+: gain 3 [gear] relevant to your chosen area(s) of expertise.\n';
msg+= '7-9: gain 1 [gear] relevant to your chosen area(s) of expertise.\n';
break;}

case 'customiser':{
msg =' Customiser: You can identify and examine new or complicated technology related to your area of expertise, and modify technology with which you are familiar. When you try to modify a piece of tech, tell the MC what you want to do and discuss what tags or game effect that modification will have. The MC will tell you the requirements in terms of:\n';
msg+= '• time\n';
msg+= '• tools\n';
msg+= '• parts\n';
msg+= '• help from contacts\n';
msg+= '• more research\n';
break;}

case 'analytic':{
msg =' Analytic: When you assess, roll Mind instead of Edge.\n';
break;}

case 'blend':
case 'blendin':{
msg =' Blend in: When you’re about to be caught somewhere you shouldn’t be, but look and act like you belong there, roll Cool.\n';
msg+= '10+: no one thinks twice about your presence until you do something to attract attention\n';
msg+= '7-9: you’ll be fine as long as you leave right now, but if you do anything else, your presence will arouse suspicion\n';
break; }

case 'bypass':{
msg =' Bypass: When you attempt to subvert security measures (bypassing a locked door, disabling an alarm, camera or motion detector, etc), roll Cool.\n';
msg+= '7+: you successfully bypass the system without leaving a trace\n';
msg+= '10+: you gain some valuable insight into the facility’s security, gain [intel]\n';
break;}

case 'diverseinterests':
case 'diverseinterest':{
msg =' Diverse interests: Choose one more area of expertise.\n';
break;}

case 'jackofalltrades':{
msg =' Jack of all trades: Choose one more area of expertise.\n';
break;}

case 'obsessive':{
msg =' Obsessive: When you shut yourself away with a problem or piece of cutting edge tech, make a research move. You may use one question to ask any question about the object of your contemplation and study.\n';
break;}

case 'onit':{
msg =' On it: When your areas of expertise are central to helping or interfering with a teammate, roll Cool instead of Links.\n';
break;}

case 'renaissanceman':{
msg =' Renaissance man: Choose one more area of expertise.\n';
break;}
case 'gitalonglittledoggy':
    case 'gitalonglittledoggie':
    case 'waleed':
      {
        msg = 'Git along little dogie! \n When you want to use Waleed to antagonise, roll Style (or Synth if you both have Neural Interface):\n';
        msg += '7+ you antagonise one character, giving you +1 Ongoing to act against that character\n';
        msg += '7-9 Choose One:\n';
        msg += '10+ Choose Two:\n';
        msg += ' - Waleed antagonises one additional character, but will struggle to escape harm \n';
        msg += ' - Waleed will escape harm, but will not antagonise for long \n';
        msg += ' - Waleed will allow you to escape harm, but will struggle to escape harm \n';
        msg += ' - Waleed will apply lethal force, but take his sweet time \n';
        msg += ' - Waleed will chase down a lead over great distance, but you will struggle to maintain contact \n';
        break;
      }

    case 'blueice':
      {
        msg = 'Blue ICE locates intruders, raises the alarm, traces their location allowing the system owner to alert physical response teams (either internal corporate teams or the appropriate local police authorities), then attempts to sever the intruder’s connection.\n';
        msg += 'When Blue ICE executes a routine, the MC chooses 1:\n';
        msg += 'Trigger an alarm (advance relevant Mission Clock)\n';
        msg += 'Trace an intruder’s location (Trace +1)\n';
        msg += 'Identify intruder (advance Corporate Clock)\n';
        msg += 'Sever an intruder’s connection\n';
        msg += 'Call for counter-hacker backup\n';
        break;
      }
    case 'redice':
      {
        msg = 'Red ICE locates intruders, raises the alarm, traces their location, then engages them to damage their cyberdeck with feedback algorithms.\n';
        msg += 'When Red ICE executes a routine, the MC chooses 2:\n';
        msg += 'Trigger an alarm (advance relevant Mission Clock)';
        msg += 'Trace an intruder’s location (Trace +2)\n';
        msg += 'Identify an intruder (advance Corporate Clock)\n';
        msg += 'Sever an intruder’s connection\n';
        msg += 'Corrupt an intruder’s program (Destroy an active program)\n Damage an intruder’s cyberdeck (Lower one of the cyberdeck’s';
        break;
      }
    case 'blackice':
      {
        msg = 'Black ICE locates intruders, raises the alarm, traces their location, then engages them to harm the intruder herself with lethal feedback algorithms. They often use psycho-electronic techniques to prevent the intruder severing the connection themselves, trapping the intruder in the matrix until the Black ICE kills them or physical response teams can reach their location.\n';
        msg += 'When Black ICE executes a routine, the MC chooses 3:\n';
        msg += 'Trigger an alarm (advance relevant Mission Clock)\n';
        msg += 'Trace an intruder’s location (Trace +3)\n';
        msg += 'Identify an intruder (advance Corporate Clock)\n';
        msg += 'Damage an intruder’s cyberdeck (Lower one of the cyberdeck’s ratings by 2)\n';
        msg += 'Inflict physical harm to a jacked in intruder (1-harm +AP)\n';
        msg += 'Prevent an intruder from jacking out and trap their mind\n';
        break;
      }
    case 'specialisedice':
    case 'specice':
      {
        msg = 'Code Wall: This Blue ICE dumps an unsuccessful hacker out of the Matrix. The only action it ever tries is sever an intruder’s connection, it doesn’t even raise an alarm, although it keeps a log that may or may not be checked.\n';
        msg += 'Klaxxon: This Red ICE simply raises an alarm, then alerts Matrix Security, who can better decide how to deal with the intrusion.\n';
        msg += 'Zombie: This Black ICE traces the intruder, then attempts to prevent them jacking out before identifying them and summoning a strike team to their location.\n';
        msg += 'Firestarter: Rather than trying to take the hacker out directly by frying their brain, this Black ICE prevents them from jacking out then repeatedly attacks their cyberdeck until it bursts into flame.\n';
        break;
      }
    case 'ice':
      {
        msg = 'ICE are autonomous programs designed to prevent infiltration of and damage to a matrix system. ICE have routines, like other Matrix systems, but they cannot be compromised and must be disabled with melt ICE. ICE routines trigger when the MC makes moves and when noted by the Matrix Moves.\n';
        msg += 'Refer to \"Blue Ice\" \"Red Ice\" \"Black Ice\" and \"Spec Ice\" for more details.';
        break;
      }

    case 'login':
      {
        msg = 'When you attempt to gain access to a system, roll Synth.\n';
        msg += '10+ You\'re in clean\n';
        msg += 'You\'re in but chose one:\n';
        msg += 'Passive trace (+1 trace)\n';
        msg += 'ICE is activated\n';
        msg += 'An alert is triggered (advance the active Mission Clock)\n';
        msg += 'Your access is restricted – take -1 ongoing to matrix moves in this system while your access is restricted\n';
        msg += '6-: You\'re in, but the MC chooses two';
        break;
      }

    case 'compromisesecurity':
      {
        msg = 'When you attempt to compromise a sub-system’s security, roll Mind.\n';
        msg += '10+: gain 3 hold over the sub-system you have compromised\n';
        msg += '7-9: gain 1 hold\n';
        msg += '6-: you trigger an alert, which may have additional consequences\n';
        msg += 'You may spend 1 hold to activate a security measure on that sub-system.\n';
      }
    case 'manipulatesystems':
    case 'manipulatesystem':
      {
        msg = 'When you attempt to manipulate a digitally-controlled aspect of a facility, roll Synth.\n';
        msg += '10+: gain 3 hold over the sub-system you are manipulating\n';
        msg += '7-9: gain 1 hold\n';
        msg += 'You may spend 1 hold to activate routines on that sub-system.';
        break;
      }
    case 'meltice':
    case 'melt':
      {
        msg = 'When you attempt to evade, destroy or disable an activated ICE construct, roll Edge.n';
        msg += '7+: you evade, destroy, or temporarily disable the system, your choice\n';
        msg += '7-9: the system successfully executes a routine before you can disable it\n';
        break;
      }

    case 'jackout':
      {
        msg = 'When you, your programs, or your deck are about to be damaged by ICE, you can try to jack out. Roll Cool.\n';
        msg += '10+: you disconnect yourself from the system before any serious harm occurs\n';
        msg += '7-9: you jack out, but choose one:\n';
        msg += 'You lose some data\n';
        msg += 'You take some of the established consequences\n';
        msg += 'The owners of the target system trace you to your current location\n';
        msg += '6-: you take the established consequences... and you’re still connected\n';
        break;
      }
	  
	  case 'hesgood,butsoami':
case 'soami':
case'he\'sgood,butsoami':
{
 msg = 'He’s good, but so am I.\n';
msg +='When you attempt to outwit a sentient opponent in The Matrix, roll Edge:\n';
msg +='7+ you temporarily evade/escape/overcome your opponent\n';
msg +='10+ gain 1 hold. Spend this to temporarily evade/escape/overcome your opponent at any other time in this run.\n';
msg += '6- your opponent gets the better of you.';
break;
}

case 'nosefortrouble':{
msg = 'Nose for trouble\n';
msg +='When you want to use Waleed to Assess a person, place or thing, justify why dog senses are better than yours and roll Cool (or +1 Synth if you both have Neural Interface).\nOn a hit, gain +1 additional hold.';
break;
}
case 'cybereyes':{
msg ='CYBEREYES: Replacement eyes that grant super-human or extra-human visual capabilities. Aesthetic considerations are also important to many buyers.\n';
msg+= 'When you have cybereyes installed, choose two of following tags: +thermographic, +light amplification, +magnification, +flare compensation, +recording, +encrypted, +inaccessible partition.\n';
msg +=' When your enhanced sight helps, you may roll Synth for assess.';
break;}

case 'cyberears':{
msg = 'CYBEREARS: Replacement ears that grant super-human or extra-human aural capabilities.\n';
msg +='When you have cyberears installed, choose two of following tags: +dampening, +wide frequency, +recording, +encrypted, +inaccessible partition.\n';
msg += 'When your enhanced hearing helps, you may roll Synth for assess.';
break;}
case 'cybercoms':{
msg ='CYBERCOMS: An internal headware communications suite which allows silent, thought-activated communications.\n';
msg+= 'When you have cybercoms installed, choose two of following tags: +encrypted, +jamming, +recording, +satellite relay, +inaccessible partition.\n';
msg +='When monitoring communications or giving orders in a tactical environment, you may roll Synth for assess.\n';
break;}
case 'cyberarm':{
msg ='CYBERARM: Replacements arms can be prosthetic replacements or elective enhancements. The former replace standard human abilities, while the latter supplement particular abilities or incorporate tools into the human body, often enhancing precision through neuro-mechanical control. Cyberarms are available in a variety of aesthetic presentations, ranging from overtly synthetic or mechanical to visually indistinguishable from human.\n';
msg +='Choose one of the following options. Additional choices can be added to the cyberarm later in the same way as adding a new piece of cyberware.\n';
msg += 'Augmented Strength: +2 harm when using a melee weapon that relies on physical strength.\n';
msg += 'Implant Tools: When you have time and space to interface with a device you are attempting to fix, bypass, or tamper with, take +1 forward.\n';
msg += 'Implant Weaponry: Either: retractable blades (2-harm hand messy implant), a holdout firearm (2 harm close loud implant), or a monofilament whip (4-harm hand messy area dangerous implant).\n';
break;}
case 'cyberlegs':{
msg ='CYBERLEGS: Replacements legs can be prosthetic replacements or elective enhancements. Elective models allow super-human athletic abilities, especially running speed and jumping distance.\n';
msg +='When your enhanced athleticism could help you act under pressure, take +1 forward. If you roll a 12+ when acting under pressure, gain 1 hold which you can spend as described in the move assess.\n';
break;}
case 'dermalplating':{
msg ='DERMAL PLATING: Sub-dermal plates of synthetic armour placed over critical internal organs.\n';
msg+=' When you make the harm move, subtract 2 from your roll. Subtract 3 from your roll if the harm came from a weapon with the +flechette tag.\n';
break;}
case 'implantweponry':{
msg='IMPLANT WEAPONRY: Retractable or internally concealed weapons can be mounted directly into the human body with appropriate structural anchoring and heat dissipation mechanisms. These include both regular weapons optimised for internal use or storage blades as well as specialised weapons like the chest-stored, orally-deployed, “cybersnakes” favoured by certain corporate honey-trap assassins.\n Either:\n';
msg += 'retractable blades (2-harm hand messy implant)\n';
msg += 'a holdout firearm (2-harm close loud implant)\n';
msg += 'a monofilament whip (4-harm hand messy area dangerous implant)\n';
msg += 'internal assassination implant (4-harm intimate slow implant)\n';
break;}
case 'musclegrafts':{
msg='MUSCLE GRAFTS: Synthetic fibres are grafted into human muscle to increase muscular strength, flexibility, and resilience.\n';
msg +='When you mix it up with a melee weapon, you may roll Synth instead of Meat and may also inflict +1 harm.\n';
break;}

case'neuralinterface':{
msg ='NEURAL INTERFACE: A headware interface that translates the brain’s neural signals into machine control impulses. This allows a user to control an appropriately configured external device such as a vehicle, mounted weapon, recording device, or hacked electronic system at instinctive neural speeds.\n'
msg +='You may take the Driver move second skin as an advance.\n';
msg +='You may take the Hacker move jack in as an advance.\n';
msg +='Choose one of the following options. Additional choices can be added to the headware system later in the same way as adding a new piece of cyberware.\n';
msg += 'Data Storage: A neural interface that allows speed-of-thought communication between the user’s brain and a Matrix-capable computer system. These systems usually include a useful quantity of headware storage capacity. When you use research to search internally or externally stored data, gain an extra [intel] on a hit. Choose two of following tags: +inaccessible partition, +encrypted, +high capacity, +high speed.\n';
msg += 'Remote Control Module: An interface which includes wireless broadcast and reception capacity allowing remote control of vehicles and drones. When you have a remote control module installed, choose two of following tags: +encrypted, +multi-tasking, +inaccessible partition.\n';
msg += 'Targeting Suite: Uses a direct neural link between a hand-held gun and user to project targeting information into the user’s vision. When you fire a weapon you are +linked to, you may inflict additional harm equal to your Synth. You may also roll Synth instead of Meat to mix it up. You may precisely define the area of effect for weapons with the +autofire tag to exclude or include potential targets from weapon damage.\n';
break;}
case 'syntheticnerves':{
msg ='SYNTHETIC NERVES: The replacement of significant parts of the nervous system can drastically increase reaction time. Users react so quickly that they can almost dodge bullets.\n';
msg+='If none of your enemies have synth nerves, take +1 forward to mix it up. In situations where reaction time is critical, take +1 forward to act under pressure.\n';
break;}
case 'skillwires':
{
msg ='SKILLWIRES: A headware expert system linked to the brain’s muscle control centres that triggers specific muscular reactions which simulate the instincts and actions of an expert practitioner. The system contains a number of external slots into which skillchips can be slotted granting a small number of skills in parallel. Skillchips often include a knowledge database covering non-physical aspects of the programmed skill.\n';
msg +='When your slotted skillchip is appropriate to a move you are making, take +1 ongoing if your relevant stat is +1 or less. Standard skillwires comes with two slots and you may have one chip active in each slot.\n';
msg +='If you start with Skillwires, you also start with one chip per slot. You can acquire more skillchips in play like any other gear. Example skillchips: martial arts, breaking and entering, rock climbing, skydiving, scuba diving, planning and logistics, firefight combat, extreme driving, parkour, first aid, military history and tactics.\n';
break;}

case 'tacticalcomputer':{
msg='TACTICAL COMPUTER: An expert system core calculates distance, environment and movement factors and provides a suite of tactical tools to enhance the user’s understanding of and operation within a tactical environment.\nWhen you assess in a tactical situation, hold +1, even on a miss\n';
break;}
case 'jackin':{
msg='Jack in\n';
msg+='7-9: you’re in, but choose one:\n';
msg += 'Passive trace (+1 trace)\n';
msg += 'ICE is activated\n';
msg += 'An alert is triggered (advance the active Mission Clock)\n';
msg += 'Your access is restricted – take -1 ongoing to matrix moves in this system while your access is restricted\n';
break;}

case 'createeditordeletesrecords':
case 'editrecords':
case 'deleterecords':
case 'createrecords':
{
msg ='Create, edit or delete records\n';
msg += 'Delete backups\n';
msg += 'Delete or edit access logs\n';
msg += 'Search for paydata (when you search for paydata in a Database, roll Mind: On a hit you find something hot that you can sell; on a 10+, when you hit the street to sell it and roll a 7-9, choose one fewer result)\n';
msg+='Security Measures:\n';
msg += 'Trigger or cancel an alert\n';
msg += 'Activate or deactivate ICE\n';
break;}
case 'drugs':
case 'druglist':
{
	msg = 'Spank, Motherfuck, Domo, Clutch, Meatlof';
	break;
}
	
case 'spank':
{
	msg ='**While Active**\n+1 Meat, -1 Synth, +Unreliable on cyber gear +1 harm on melee attacks +short \n';
	msg+= '**Withdrawal**\n-2 Style, -1 Meat -long';
	break;
}
case 'motherfuck':
{
	msg ='**While Active**\n+2 Edge, -2 Cool, -long\n';
	msg+='**Withdrawal** \n-1 Cool -Day';
	break;
}
case 'domo':
{
	msg ='**While Active**\n+2 Synth, -1 All else, take 1 harm (harm increases per use per day) -instant\n';
	msg+='**Withdrawal**\n-1 Synth +Harmful on cybergear -short';
	break;
}
case 'clutch':
{
	msg ='**While Active**\n-1 to Take Harm move, -1 Mind, -Short\n';
	msg+='**Withdrawal**\nCardiac arrest if taken more than twice a day.';
	break;
}
case 'meatloaf':
{
	msg ='**While Active**\n+Fast Reflexes -short\n';
	msg+='**Withdrawal**\n-2 Meat, -2 Edge, -long';
	break;
}
    default:
      {
        //message = 'Not found or syntax error. Please input as "!help # term"';
        //var mes = 'INVALID HELP TERM: ' + paramTemp;
        msg = 'Not found. Logging to console.';
		var conLog = '';
		var conLog = '@INVAILD START\n'+paramTemp+'\n@INVALID END';
        console.log(conLog);
        break;
      }
  }
  return msg;
}

function getParam(str)
{
  var string = str;
  var substring = '#';
  str = str = str.substring(str.indexOf('#') + 1);
  //return string.split('#')[1];
  return str;
}

function getInput(str)
{
  if (str.indexOf('#') !== -1)
  {
    str = str.substring(0, str.indexOf('#'));
  }

  //document.write(s);
  return str;
}

function checkParam(str)
{
  var check = false;
  var temp = str.indexOf('#');
  //console.log(temp);
  if (str.indexOf('#') !== -1)
  {
    return true; //no param
  }
  else
  {
    return false;
  }

}
function getContactName(str)
{
  var substring = ':';
  if (str.indexOf(':') !== -1)
  {
    str = str.substring(0, str.indexOf(':'));
  }
  return str; 
}

function fixInput(str)
{
  var tempString;
  while (str.indexOf(' ') !== -1)
  {
    str = str.replace(' ', '');
  }
  return str;
}




function rollDice()
{
	//Rolls basic dice, 1-12. 
    var dice = Math.floor((Math.random() * 6) + 1);
	dice += Math.floor((Math.random() * 6) + 1);
	var message ='';
	
	switch(dice)
	{
	case 12:
	{
		diceLog[12]+= 1;
		message = 'Ayyy, Noice, you rolled a 12.';
		break;
	}
	case 11:
	{
		diceLog[11]+= 1;
		message = 'Nice, you rolled an 11.';
		break;
	}
	case 10:
	{
		diceLog[10]+= 1;
		message = 'Nice, you rolled a 10.';
		break;
	}
	case 9:
	{
		diceLog[9]+= 1;
		message = 'close but not close enough, you rolled a 9.';
		break;
	}case 8:
	{
		diceLog[8]+= 1;
		message = 'You rolled an 8.';
		break;
	}
	case 7:
	{
		diceLog[7]+= 1;
		message = 'Hopefully you dont have fucked up stats from all those drugs, cause you rolled a 7.';
		break;
	}
	case 6:
	{
		diceLog[6]+= 1;
		message = 'Hopefully those stims helped cause you rolled a 6.';
		break;
	}case 5:
	{
		diceLog[5]+= 1;
		message = 'You rolled a 5.';
		break;
	}
	case 4:
	{
		diceLog[4]+= 1;
		message = 'Oof, you rolled a 4.';
		break;
	}
	case 3:
	{
		diceLog[3]+= 1;
		message = 'Fun times for the MC cause you rolled a 3.';
		break;
	}
	case 2:
	{
		diceLog[2]+= 1;
		message = 'If you\'re not fucked you are now cause you rolled a 2, the lowest fucking roll now that 1\'s dont exist.';
		break;
	}
	default:
	{
		message = 'Somehow the dice wasn\'t 1-12, so treat this badly cause somehow you broke the code.';
		break;
	}
	}
	
	return message;
}