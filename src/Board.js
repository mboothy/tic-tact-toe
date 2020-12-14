import React,{useState,useEffect} from 'react'
import Tile from './Tile'

const Board = () => {
    const [tiles, setTiles] = useState([])
    const [renderedTiles, setRenderedTiles] = useState()
    const [turn, setTurn] = useState(1);
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState(null); 
    const [p1Score, setP1Score] = useState(0);
    const [p2Score, setP2Score] = useState(0);
    
    const newGame = () => {
        createTiles();
        setGameOver(false)
        setWinner(null)
    }

    const createTiles = () => {
        const x = []; 
        for(let i = 0; i < 9; i++){
            x.push({
                id: i,
                value: null
            })
        }
        setTiles(x,renderTiles(tiles));
    }

    const renderTiles = (tilesToRender) => {
        const x = tilesToRender.map(tile => {
           return <Tile key={tile.id} id={tile.id} value={tile.value} toggleTile={onTileClicked} />
        })
        setRenderedTiles(x);
    }
    const onTileClicked = (tileId) => {
        console.log('Click')
        if(tiles[tileId].value == null && !gameOver){
            const updatedArray = [...tiles]
            if(turn === 1){
                updatedArray[tileId].value = 1;
                setTurn(2)
            } else if( turn === 2){
                updatedArray[tileId].value = 2;
                setTurn(1)
            }
            setTiles(updatedArray, checkTiles())
        }
        
    }
    const checkTiles = () => {
        
        if(tiles[0].value === tiles[1].value && tiles[1].value === tiles[2].value && tiles[2].value !== null){
            setWinner(tiles[0].value, setGameOver(true))
        } else if(tiles[3].value === tiles[4].value && tiles[4].value === tiles[5].value && tiles[5].value !== null){
            setWinner(tiles[3].value, setGameOver(true))
        } else if(tiles[6].value === tiles[7].value && tiles[7].value === tiles[8].value && tiles[8].value !== null){
            setWinner(tiles[6].value, setGameOver(true))
        } else if(tiles[0].value === tiles[3].value && tiles[3].value === tiles[6].value && tiles[6].value !== null){
            setWinner(tiles[0].value, setGameOver(true))
        } else if(tiles[1].value === tiles[4].value && tiles[4].value === tiles[7].value && tiles[7].value !== null){
            setWinner(tiles[1].value, setGameOver(true))
        } else if(tiles[2].value === tiles[5].value && tiles[5].value === tiles[8].value && tiles[8].value !== null){
            setWinner(tiles[2].value, setGameOver(true))
        } else if(tiles[0].value === tiles[4].value && tiles[4].value === tiles[8].value && tiles[8].value !== null){
            setWinner(tiles[0].value, setGameOver(true))
        } else if(tiles[2].value === tiles[4].value && tiles[4].value === tiles[6].value && tiles[6].value !== null){
            setWinner(tiles[2].value, setGameOver(true))
        } else if(tiles[0].value !== null) {
            let count = 0;

            tiles.map(x => {
                if(x.value === null){
                    count++
                }
            });
    
            if(count === 0){
                setWinner('draw', setGameOver(true))
            }
            console.log(`count: ${count}`)
        }

        
    }

    useEffect(() => {
        createTiles();

    }, []);
    useEffect(() => {
        const newWinner = winner;
        if(winner === 1){
            setP1Score(p1Score + 1)
        } else if (winner === 2){
            setP2Score(p2Score + 1)
        }

    }, [winner]);
    useEffect(() => {
        renderTiles(tiles);

    }, [tiles]);

    return (
        <div className="board my-7">
            <div className="stats text-center font-bold text-center text-gray-700 text-2xl flex flex-col justify-around items-center">
                {/* <h2>Current Turn: Player {turn}</h2> */}
                <div className="scores flex justify-center" style={{width: '450px'}}>
                    <div style={{width: '225px'}} className={`player1Score text-white text-center py-2 rounded-tl-3xl
                    ${turn === 1? 'bg-red-500' : 'bg-red-300'}
                    `}>
                        X Score: {p1Score}
                    </div>
                    <div style={{width: '225px'}} className={`player2Score text-white text-center py-2 rounded-tr-3xl
                    ${turn === 2? 'bg-blue-500' : 'bg-blue-300'}
                    `}>
                        O Score: {p2Score}
                    </div>
                </div>
            </div>
            <div className="grid">
                {renderedTiles}
            </div>
            {gameOver? 
                <div className=" flex justify-center flex-col gameOver bg-green-600 text-white rounded-md p-4 shadow-md opacity-90">
                    <h1 className="font-bold text-center text-white text-6xl">Game Over</h1>
                    <h3 className="text-base text-center text-2xl">{winner === 1 || winner === 2? `Winner is Player ${winner}`: "Draw"}</h3>
                    <p className="newGame flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-bold text-white hover:text-green-200 text-lg" onClick={newGame}>New Game?</p>
                </div>  : ''} 
        </div>
    )
}

export default Board
