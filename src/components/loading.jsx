
import { grid } from 'ldrs'

grid.register()
export function Loading() {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 z-50 flex items-center justify-center" >
                    <l-grid
                    size="80"
                    speed="1.5" 
                    color="white" 
                    ></l-grid>
        </div>
    )
}