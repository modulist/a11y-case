from http.server import HTTPServer, SimpleHTTPRequestHandler
import os

# Set the port
PORT = 80

# Serve files from the static directory
class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        static_dir = os.path.join(os.getcwd(), 'static')
        super().__init__(*args, directory=static_dir, **kwargs)

    # Set the content type for Markdown files to be treated as text
    def guess_type(self, path):
        content_type = SimpleHTTPRequestHandler.guess_type(self, path)
        if str(path).endswith('.md'):
            content_type = 'text/markdown'
        return content_type

# Create the server
httpd = HTTPServer(('0.0.0.0', PORT), Handler)

print(f"Serving at http://0.0.0.0:{PORT}")
print("Press Ctrl+C to stop the server")

# Run the server
try:
    httpd.serve_forever()
except KeyboardInterrupt:
    print("\nServer stopped")
    httpd.server_close()