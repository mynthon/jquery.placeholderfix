import urllib
import urllib2
import sys
import glob
import os

class Config:
    service_url = 'http://marijnhaverbeke.nl/uglifyjs'
    js_path = '../../source/'
    js_files = ['jquery.placeholderfix.js']
    output_path = '../../bin'
    output_suffix = '.min'

def get_file_as_url_param(pram_name, file_path):
    filep = open(file_path)
    url_param = urllib.urlencode({'js_code': filep.read()})
    filep.close()
    return url_param

def get_optimized_code(service_url, params):
    page = urllib2.urlopen(service_url, params)
    return page.read()

def save_to_file(file_path, data):
    out_fp = open(file_path, 'w')
    out_fp.write(data)
    out_fp.close()

def prepare_output_path(output_path):
    path, ext = os.path.splitext(output_path)
    return path + Config.output_suffix + ext

def main():
    js_path = Config.js_path
    js_files = Config.js_files
    output_path = Config.output_path

    for js_file in js_files:
        try:
            service_url = Config.service_url
            url_params = get_file_as_url_param('js_code', os.path.join(js_path, js_file))
            optimized_code = get_optimized_code(service_url, url_params)
            output_path = prepare_output_path(os.path.join(output_path, js_file))
            save_to_file(output_path, optimized_code)
        except urllib2.HTTPError, error_message:
            print error_message;

main()