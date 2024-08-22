import asyncio
import websockets
import json
import random

async def send_message():
    uri = "ws://localhost:8765"
    async with websockets.connect(uri) as websocket:
        while True:
            pm_data = {"pm": random.randint(0, 100)}  # สุ่มค่าฝุ่น PM จาก 0-100
            message = json.dumps(pm_data)
            await websocket.send(message)
            print(f'Client sent: {message}')
            response = await websocket.recv()
            print(f'Client received: {response}')
            await asyncio.sleep(5)  # ส่งข้อมูลทุกๆ 5 วินาที

if __name__ == "__main__":
    asyncio.run(send_message())
