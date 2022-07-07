const React = require('react');
const { useState, useEffect } = React;
const { Text, Box } = require('ink');

const pongStates = [
  '|o     |',
  '| o    |',
  '|  o   |',
  '|   o  |',
  '|    o |',
  '|     o|',
  '|    o |',
  '|   o  |',
  '|  o   |',
  '| o    |',
];

const Counter = () => {
	const [counter, setCounter] = useState(0);
  const [pongString, setPongString] = useState(pongStates[0]);
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => {
			setCounter(previousCounter => previousCounter + 1);
      setTime(new Date());
		}, 100);

		return () => {
			clearInterval(timer);
		};
	}, []);

  useEffect(() => {
    // Just wanted a different timer sequence
    let i = 0;
    const timer = setInterval(() => {
      setPongString(pongStates[++i % pongStates.length]);
    }, 110);

		return () => {
			clearInterval(timer);
		};
  }, []);

	return <>
    <Box flexDirection="column" padding={2}>
      <Box>
        <Box borderStyle="single" marginRight={2}>
          <Text color="green">{counter}</Text>
        </Box>

        <Box borderStyle="double" marginRight={2}>
          <Text color="blue">{time.toLocaleString()}</Text>
        </Box>

        <Box borderStyle="round" marginRight={2}>
          <Text>round</Text>
        </Box>

        <Box borderStyle="bold">
          <Text>bold</Text>
        </Box>
      </Box>

      <Box marginTop={1}>
        <Box borderStyle="singleDouble" marginRight={2}>
          <Text>{pongString.split('').reverse().join('')}</Text>
        </Box>

        <Box borderStyle="doubleSingle" marginRight={2}>
          <Text color="yellow">{pongString}</Text>
        </Box>

        <Box borderStyle="classic">
          <Text>classic</Text>
        </Box>
      </Box>
    </Box>
    <Text>Footer</Text>
  </>;
};

module.exports = Counter;
