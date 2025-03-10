from http.server import HTTPServer, SimpleHTTPRequestHandler
import ssl
from pathlib import Path
import os

class CustomHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        # Меняем текущую рабочую директорию на папку src
        os.chdir(os.path.join(os.path.dirname(__file__), 'src'))
        super().__init__(*args, **kwargs)

    def guess_type(self, path):
        # Если путь содержит /auth/handler, считаем это HTML
        mappedPath = path.replace('\\', '/')
        if '/auth/handler' in mappedPath:
            return 'text/html'
        if '/auth/iframe' in mappedPath:
            return 'text/html'
        return super().guess_type(path)

port = 8000

httpd = HTTPServer(("localhost", port), CustomHandler)  # Используем CustomHandler вместо SimpleHTTPRequestHandler
ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
ssl_context.load_cert_chain(Path(__file__).parent / "localhost.pem")
httpd.socket = ssl_context.wrap_socket(
    httpd.socket,
    server_side=True,
)

print(f"Serving on https://localhost:{port}")
httpd.serve_forever()