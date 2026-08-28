import http.server, socketserver, time, os, subprocess, threading
root=os.path.join(os.path.dirname(os.path.abspath(__file__)),'dist'); idx=os.path.join(root,'index.html')
class H(http.server.SimpleHTTPRequestHandler):
    def translate_path(self,p):
        q=p.split('?')[0].split('#')[0]
        return os.path.join(root,q.lstrip('/')) if q!='/' else idx
    def do_GET(self):
        if self.path.startswith('/wait'):
            time.sleep(11); self.send_response(200); self.send_header('Content-Type','image/gif')
            self.send_header('Content-Length','43'); self.end_headers()
            try: self.wfile.write(bytes.fromhex('47494638396101000100800000000000ffffff21f90401000000002c00000000010001000002024401003b'))
            except Exception: pass
            return
        try: return super().do_GET()
        except Exception: pass
    def log_message(self,*a): pass
socketserver.ThreadingTCPServer.allow_reuse_address=True
s=socketserver.ThreadingTCPServer(("127.0.0.1",8800),H)
threading.Thread(target=s.serve_forever,daemon=True).start()
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
# «итог» ниже программы: сдвигаемся к season и целимся в хвост секции
subprocess.run([CH,"--headless=new","--disable-gpu","--hide-scrollbars",
  "--window-size=1280,1000","--screenshot=_screens/f7-itog.png",
  "http://127.0.0.1:8800/?el=itog"],capture_output=True)
print("f7-itog", os.path.getsize('_screens/f7-itog.png')//1024,"КБ")
s.shutdown()
