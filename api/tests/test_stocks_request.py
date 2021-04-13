import os,sys,inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0,parentdir) 

import stocks_requests as rq 

def test_get_quote_data():
    data = rq.get_quote_data('FRT')
    
    assert data['displayName'] == 'Federal Realty'