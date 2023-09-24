import path from 'path';
import { fileURLToPath } from 'url';

export const defaultR = (req, res)=>{   
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    res.sendFile(path.join(__dirname,'..','..','public', 'html', 'index.html'));
}
