#!/usr/bin/env python2
import struct
import math
import random
from frequency import *
from collections import Counter

def padding(artificial_payload, raw_payload):
    padding = ""
	# Get frequency of raw_payload and artificial profile payload
    artificial_frequency = frequency(artificial_payload)
    raw_payload_frequency = frequency(raw_payload)

	# To simplify padding, you only need to find the maximum frequency difference for each byte in raw_payload and artificial_payload, and pad that byte to the end of the raw_payload. Note: only consider the difference when artificial profile has higher frequency.
    #print raw_payload
    artificial_frequency = sorting(artificial_frequency)
    raw_payload_frequency = sorting(raw_payload_frequency)
    
    # Your code here ... 
    mmax = 0
    char = ''
    for i in range(len(artificial_payload)):
        lookfor = artificial_payload[i]
        artprob = 0
        rawprob = 0
        for artspot in range(len(artificial_frequency)):
            if lookfor == artificial_frequency[artspot][0]:
                artprob = artificial_frequency[artspot][1]
                break
        for rawspot in range(len(raw_payload_frequency)):
            if lookfor == raw_payload_frequency[rawspot][0]:
                rawprob = raw_payload_frequency[rawspot][1]
                break
        if artprob == 0 or rawprob == 0:
            continue
        if mmax < artprob - rawprob:
            mmax = artprob - rawprob
            char = lookfor
    
    # Depending on the difference, call raw_payload.append
    
    amounttopad = (len(artificial_payload)-len(raw_payload))
    for i in range(amounttopad):
        raw_payload.append(char)

    
