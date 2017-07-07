#!/usr/bin/env python2
import struct
import math
import dpkt
import socket
from collections import Counter
from frequency import *

def substitute(attack_payload, substitution_table):
    # Using the substitution table you generated to encrypt attack payload
    # Note that you also need to generate a xor_table which will be used to decrypt the attack_payload
    # i.e. (encrypted attack payload) XOR (xor_table) = (original attack payload)
    b_attack_payload = bytearray(attack_payload)
    result = []
    xor_table = []
    # Based on your implementattion of substitution table, please prepare result and xor_table as output

    import random 
    
    for i in range(len(b_attack_payload)):
        # we get the character we're to replace, then find it's corresponding characters in the sub table.  we build a string then choose one at random.
        # we then find the xor value and append it to our xor table.
        charToGet = chr(b_attack_payload[i])
        string = ""
        for j in range(len(substitution_table)):
            if substitution_table[j][0] == charToGet:
                string = string + substitution_table[j][1]
        index = random.randint(0,len(string)-1)
        newchar = string[index]
        result.append(newchar)
        xor_table.append(chr(ord(charToGet) ^ ord(newchar)))
        
    # we pad to a multiple of four, since our result is already greater than 124 for my userid.
    while (len(xor_table) % 4 != 0):
        result.append(chr(0))
        xor_table.append(chr(0))

    return (xor_table, result)

def getSubstitutionTable(artificial_payload, attack_payload):
    # You will need to generate a substitution table which can be used to encrypt the attack body by replacing the most frequent byte in attack body by the most frequent byte in artificial profile one by one

    # Note that the frequency for each byte is provided below in dictionay format. Please check frequency.py for more details
    artificial_frequency = frequency(artificial_payload)
    attack_frequency = frequency(attack_payload)

    sorted_artificial_frequency = sorting(artificial_frequency)
    sorted_attack_frequency = sorting(attack_frequency)

    substitution_table = []

    # Your code here ...

    # create an alphabet.  This will ensure no duplicates later on.
    alphabet = []
    for i in range(255):
        alphabet.append(chr(i))
   
    # loop control variables.
    i = 0
    j = 0
    
    while i < len(sorted_attack_frequency) and j < len(sorted_artificial_frequency):
        # for each character in the attack payload, we will find one or several characters in the artificial payload whose frequency probability 
        # will add up to less than the probability of the attack character.  Our substitute method will choose one of those artificial payload
        # characters to replace the attack character at random.
        probsum = 0
        # as long as the probability is less than the given probability, add a new char to the sub table.  add it's probabliity, and remove it from the alpahbet.
        while probsum < sorted_attack_frequency[i][1] and j < len(sorted_artificial_frequency):
            substitution_table.append((sorted_attack_frequency[i][0],sorted_artificial_frequency[j][0]))
            probsum = probsum + sorted_artificial_frequency[j][1]
            alphabet.remove(sorted_artificial_frequency[j][0])
            j = j + 1
        i = i + 1
      
    # if we have chars left in our attack frequency, they have probability less than the probabilities in our artificial list. so we'll replace them
    # with random characters from our alphabet (removing them as they are used.)
    
    import random
    
    while i < len(sorted_attack_frequency):
        k = alphabet[random.randint(0,len(alphabet)-1)]
        substitution_table.append((sorted_attack_frequency[i][0],k))
        alphabet.remove(k)
        i = i + 1
      
    # for any chars in our alphabet, they'll substitute for themselves, one-to-one.
    
    while len(alphabet) > 0:
        substitution_table.append((alphabet[0],alphabet[0]))
        alphabet.remove(alphabet[0])
    
    # You may implement substitution table in your way. Just make sure it can be used in substitute(attack_payload, subsitution_table)
    return substitution_table


def getAttackBodyPayload(path):
    f = open(path)
    pcap = dpkt.pcap.Reader(f)
    for ts, buf in pcap:
        eth = dpkt.ethernet.Ethernet(buf)
        ip = eth.data
        if socket.inet_ntoa(ip.dst) == "192.150.11.111": # verify the dst IP from your attack payload
            tcp = ip.data
            if tcp.data == "":
                continue
            return tcp.data.rstrip()

def getArtificialPayload(path):
    f = open(path)
    pcap = dpkt.pcap.Reader(f)
    for ts, buf in pcap:
        eth = dpkt.ethernet.Ethernet(buf)
        ip = eth.data
        tcp = ip.data
        if tcp.sport == 80 and len(tcp.data) > 0:
            return tcp.data
