from http.server import HTTPServer, SimpleHTTPRequestHandler
import ssl
from pathlib import Path
import os
from urllib.parse import urlparse, urlunparse

class CustomHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        # Меняем текущую рабочую директорию на папку src
        os.chdir(os.path.join(os.path.dirname(__file__), 'src'))
        super().__init__(*args, **kwargs)

    def should_add_html(self, path):
        # Проверяем, что путь начинается с /auth/
        return path.startswith('/__/auth/')

    def translate_path(self, path):
        # Разбираем URL
        parsed = urlparse(path)
        
        # Если путь не заканчивается на .html и подходит под фильтр, пробуем добавить его
        if not parsed.path.endswith('.html') and self.should_add_html(parsed.path):
            new_path = parsed.path + '.html'
            
            # Собираем URL обратно
            path_with_html = urlunparse(parsed._replace(path=new_path))
            
            # Пробуем получить путь к файлу с .html
            try:
                translated_path = super().translate_path(path_with_html)
                if os.path.exists(translated_path):
                    return translated_path
            except Exception:
                pass
        
        # Если не получилось с .html или файл не существует, используем оригинальный путь
        return super().translate_path(path)

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