// debugEvent.js
import { Events } from 'distube';

export default function registerDebugEvent(distube) {
	distube.on(Events.DEBUG, (message) => {
		console.log('[DisTube DEBUG]', message);
	});
}