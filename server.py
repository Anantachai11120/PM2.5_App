import asyncio
import websockets

connected_clients = set()

async def handler(websocket, path):
    connected_clients.add(websocket)
    print(f"Client connected: {path}")
    try:
        async for message in websocket:
            print(f"Received message: {message}")
            for client in connected_clients:
                if client != websocket:
                    await client.send(message)
                    print(f"Sent to other client: {message}")
    except websockets.ConnectionClosed:
        print("Client disconnected")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        connected_clients.remove(websocket)

async def main():
    async with websockets.serve(handler, "0.0.0.0", 5000):
        print("Server started on ws://0.0.0.0:5000")
        await asyncio.Future()  # Run forever

if __name__ == "__main__":
    asyncio.run(main())
