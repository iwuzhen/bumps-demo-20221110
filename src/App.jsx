import { useState } from 'react'
import './App.css'
import { ResponsiveBump } from '@nivo/bump'
import { useEffect } from 'react';

import Select from 'react-select'

let source = [
  ['Country', 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28],
  ['US', 1, 1, 1, 5, 10, 14, 17, 19, 22, 23, 23, 25, 25, 25, 25],
  ['GB', 2, 2, 10, 21, 33, 41, 43, 46, 49, 50, 51, 52, 53, 54, 55],
  ['CA', 3, 3, 11, 19, 30, 39, 40, 41, 43, 46, 47, 48, 48, 48, 48],
  ['AU', 4, 8, 28, 42, 61, 68, 70, 75, 76, 76, 78, 79, 79, 79, 79],
  ['NZ', 5, 22, 41, 60, 71, 76, 82, 82, 82, 84, 84, 85, 85, 86, 86],
  ['GR', 6, 29, 32, 34, 37, 37, 37, 35, 35, 36, 36, 36, 37, 37, 37],
  ['NL', 7, 6, 17, 26, 35, 40, 42, 44, 48, 49, 49, 49, 49, 49, 49],
  ['IL', 8, 4, 6, 9, 13, 16, 16, 17, 17, 17, 19, 20, 20, 21, 21],
  ['TR', 9, 26, 29, 31, 31, 29, 30, 31, 31, 32, 33, 33, 33, 33, 33],
  ['NO', 10, 24, 37, 45, 59, 67, 68, 69, 71, 72, 72, 73, 73, 73, 73],
  ['IT', 11, 11, 9, 12, 12, 12, 12, 13, 14, 14, 14, 14, 14, 14, 14],
  ['TW', 12, 13, 12, 10, 11, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11],
  ['ZA', 13, 41, 68, 81, 89, 95, 95, 96, 96, 97, 97, 97, 97, 97, 97],
  ['IN', 14, 32, 35, 30, 24, 23, 24, 25, 25, 24, 24, 24, 24, 24, 24],
  ['ES', 15, 27, 26, 29, 23, 27, 28, 29, 29, 29, 29, 30, 30, 30, 30],
  ['BR', 16, 37, 49, 53, 54, 54, 53, 55, 54, 54, 54, 54, 54, 53, 53],
  ['BE', 17, 16, 22, 27, 29, 34, 36, 37, 38, 38, 38, 38, 38, 38, 38],
  ['FI', 18, 12, 20, 20, 25, 31, 35, 36, 39, 39, 39, 39, 39, 39, 39],
  ['SE', 19, 10, 19, 24, 32, 38, 39, 40, 40, 41, 41, 41, 41, 42, 42],
  ['PT', 20, 30, 33, 33, 34, 32, 33, 34, 34, 34, 34, 34, 34, 34, 34],
  ['PL', 21, 21, 18, 13, 9, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
  ['DE', 22, 5, 2, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  ['IE', 23, 23, 34, 40, 46, 53, 60, 63, 66, 66, 66, 66, 66, 66, 66],
  ['MX', 24, 46, 53, 56, 57, 57, 55, 56, 56, 55, 55, 55, 55, 55, 54],
  ['FR', 25, 20, 15, 11, 8, 9, 8, 8, 9, 9, 9, 9, 9, 9, 9],
  ['AT', 26, 14, 14, 15, 18, 20, 21, 23, 24, 26, 27, 27, 27, 27, 27],
  ['CN', 27, 18, 8, 8, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
  ['KR', 28, 9, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
  ['DK', 29, 19, 24, 32, 39, 43, 46, 50, 51, 51, 50, 51, 51, 51, 51],
  ['SG', 30, 7, 5, 7, 7, 8, 9, 10, 10, 10, 10, 10, 10, 10, 10],
  ['JP', 31, 15, 4, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  ['SI', 32, 34, 27, 28, 22, 25, 27, 28, 28, 28, 28, 28, 29, 29, 29],
  ['EG', 33, 47, 45, 43, 43, 42, 38, 38, 37, 37, 37, 37, 36, 36, 36],
  ['IR', 34, 31, 25, 23, 20, 19, 19, 16, 16, 16, 16, 16, 16, 16, 16],
  ['MY', 35, 38, 47, 51, 55, 56, 56, 57, 57, 56, 56, 56, 56, 56, 56],
  ['RS', 36, 39, 38, 36, 36, 33, 32, 32, 32, 31, 31, 31, 32, 32, 32],
  ['CH', 37, 17, 13, 14, 16, 17, 18, 18, 18, 19, 21, 21, 22, 22, 22],
  ['RO', 38, 33, 23, 17, 17, 15, 14, 14, 13, 12, 12, 12, 12, 12, 12],
  ['CZ', 39, 35, 30, 25, 21, 21, 20, 20, 19, 21, 20, 19, 19, 19, 19],
  ['ID', 40, 63, 79, 86, 90, 92, 93, 92, 92, 92, 92, 92, 93, 93, 93],
  ['HU', 41, 28, 21, 16, 15, 13, 13, 12, 12, 13, 13, 13, 13, 13, 13],
  ['SA', 42, 42, 40, 39, 38, 35, 34, 33, 33, 33, 32, 32, 31, 31, 31],
  ['TH', 43, 58, 71, 77, 80, 79, 76, 77, 77, 77, 76, 76, 77, 77, 77],
  ['PK', 44, 57, 65, 71, 70, 70, 69, 68, 68, 68, 68, 68, 68, 68, 68],
  ['NG', 45, 71, 91, 98, 100, 103, 104, 104, 104, 104, 104, 104, 104, 104, 104],
  ['RU', 46, 25, 7, 4, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2],
  ['CL', 47, 48, 51, 57, 62, 62, 65, 64, 63, 64, 64, 64, 64, 64, 64],
  ['AR', 48, 53, 57, 61, 63, 59, 59, 58, 58, 58, 58, 58, 58, 58, 58],
  ['CO', 49, 67, 81, 87, 92, 94, 94, 94, 94, 94, 94, 94, 94, 94, 94],
  ['HR', 50, 40, 42, 41, 44, 44, 44, 43, 42, 42, 42, 43, 43, 43, 43],
  ['GE', 51, 43, 58, 76, 82, 88, 91, 93, 95, 95, 95, 95, 96, 96, 96],
  ['JO', 52, 59, 61, 63, 65, 65, 66, 66, 64, 63, 63, 63, 63, 63, 63],
  ['SK', 53, 49, 39, 35, 26, 26, 26, 26, 27, 27, 26, 26, 26, 26, 26],
  ['AE', 54, 45, 43, 47, 52, 55, 58, 59, 60, 61, 61, 61, 61, 61, 61],
  ['PH', 55, 50, 56, 72, 78, 81, 83, 85, 86, 87, 89, 89, 89, 89, 89],
  ['CY', 56, 51, 50, 50, 56, 60, 64, 65, 65, 65, 65, 65, 65, 65, 65],
  ['LT', 57, 52, 46, 44, 45, 46, 47, 45, 46, 47, 46, 46, 46, 47, 47],
  ['LB', 58, 60, 64, 75, 76, 77, 78, 80, 80, 80, 80, 80, 80, 80, 80],
  ['BD', 59, 72, 86, 90, 91, 91, 90, 90, 90, 90, 90, 90, 90, 90, 90],
  ['BG', 60, 44, 31, 22, 19, 18, 15, 15, 15, 15, 15, 15, 15, 15, 15],
  ['VN', 61, 77, 85, 82, 81, 80, 79, 78, 78, 78, 77, 77, 76, 76, 76],
  ['TN', 62, 65, 59, 55, 49, 47, 45, 42, 41, 40, 40, 40, 40, 40, 40],
  ['KW', 63, 68, 67, 66, 68, 69, 67, 67, 67, 67, 67, 67, 67, 67, 67],
  ['MA', 64, 73, 77, 79, 77, 74, 72, 71, 70, 70, 70, 70, 70, 70, 70],
  ['UA', 65, 36, 16, 6, 4, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1],
  ['LK', 66, 89, 101, 106, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109],
  ['DZ', 67, 62, 44, 37, 28, 24, 23, 24, 23, 22, 22, 22, 21, 20, 20],
  ['QA', 68, 56, 52, 49, 50, 52, 52, 52, 53, 53, 53, 53, 52, 52, 52],
  ['OM', 69, 78, 87, 85, 85, 86, 85, 84, 84, 82, 82, 82, 82, 82, 82],
  ['GH', 70, 95, 115, 122, 124, 125, 128, 128, 129, 129, 129, 129, 129, 129, 130],
  ['VE', 71, 74, 75, 78, 75, 72, 71, 70, 69, 69, 69, 69, 69, 69, 69],
  ['LU', 72, 54, 48, 46, 47, 50, 51, 54, 55, 57, 57, 59, 59, 59, 59],
  ['KZ', 73, 82, 82, 80, 79, 75, 75, 72, 72, 71, 71, 71, 71, 71, 71],
  ['IQ', 74, 70, 66, 62, 58, 51, 50, 49, 47, 43, 43, 42, 42, 41, 41],
  ['MK', 75, 69, 69, 73, 73, 73, 74, 74, 74, 75, 75, 75, 75, 75, 75],
  ['EE', 76, 66, 63, 69, 69, 71, 73, 73, 73, 74, 74, 74, 74, 74, 74],
  ['ET', 77, 93, 103, 110, 111, 111, 111, 112, 112, 112, 112, 112, 112, 112, 113],
  ['NP', 78, 96, 112, 115, 119, 120, 120, 120, 121, 121, 121, 122, 122, 122, 122],
  ['LV', 79, 64, 55, 58, 60, 61, 62, 62, 62, 62, 62, 62, 62, 62, 62],
  ['KE', 80, 104, 129, 134, 138, 142, 143, 144, 144, 144, 144, 144, 144, 144, 144],
  ['BY', 81, 55, 36, 18, 14, 11, 10, 9, 8, 8, 8, 8, 8, 8, 8],
  ['BA', 82, 80, 83, 84, 84, 85, 86, 86, 85, 86, 86, 86, 86, 85, 85],
  ['EC', 83, 98, 105, 108, 107, 108, 108, 108, 108, 108, 108, 108, 108, 108, 108],
  ['HK', 84, 61, 60, 67, 74, 78, 80, 81, 81, 81, 81, 81, 81, 81, 81],
  ['UY', 85, 83, 90, 93, 94, 93, 92, 91, 91, 91, 91, 91, 91, 91, 91],
  ['PE', 86, 112, 126, 130, 130, 131, 134, 134, 134, 134, 134, 134, 135, 135, 135],
  ['TZ', 87, 124, 136, 147, 149, 151, 152, 152, 152, 153, 153, 153, 154, 154, 154],
  ['BH', 88, 90, 97, 100, 104, 105, 105, 105, 106, 106, 106, 106, 106, 106, 106],
  ['CM', 89, 116, 125, 126, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127],
  ['ZW', 90, 120, 130, 133, 136, 138, 140, 141, 141, 141, 141, 141, 141, 141, 141],
  ['CU', 91, 91, 93, 95, 93, 90, 89, 89, 89, 89, 88, 88, 88, 88, 88],
  ['IS', 92, 75, 84, 91, 96, 97, 98, 98, 98, 99, 99, 99, 99, 99, 99],
  ['JM', 93, 110, 121, 125, 126, 129, 129, 129, 130, 131, 131, 131, 131, 131, 131],
  ['MT', 94, 81, 88, 94, 97, 98, 99, 99, 100, 100, 100, 101, 101, 101, 101],
  ['SD', 95, 115, 119, 120, 118, 117, 115, 113, 113, 113, 113, 113, 113, 113, 112],
  ['CR', 96, 118, 127, 127, 129, 130, 130, 130, 131, 130, 130, 130, 130, 130, 129],
  ['BW', 97, 126, 131, 131, 134, 136, 137, 137, 137, 138, 138, 138, 138, 138, 138],
  ['UG', 98, 125, 137, 149, 153, 155, 156, 157, 159, 161, 161, 162, 162, 162, 162],
  ['AM', 99, 86, 78, 74, 67, 63, 61, 60, 59, 59, 59, 57, 57, 57, 57],
  ['LY', 100, 99, 96, 97, 95, 89, 88, 87, 87, 85, 85, 84, 84, 84, 84],
  ['TT', 101, 123, 123, 124, 123, 123, 124, 124, 124, 124, 124, 124, 124, 124, 124],
  ['AZ', 102, 85, 70, 48, 41, 36, 31, 30, 30, 30, 30, 29, 28, 28, 28],
  ['AL', 103, 119, 118, 116, 115, 116, 114, 115, 115, 115, 115, 115, 115, 115, 115],
  ['SY', 104, 105, 108, 107, 105, 104, 103, 103, 103, 103, 103, 103, 103, 103, 103],
  ['PS', 105, 87, 89, 89, 88, 87, 87, 88, 88, 88, 87, 87, 87, 87, 87],
  ['MD', 106, 84, 73, 70, 66, 64, 63, 61, 61, 60, 60, 60, 60, 60, 60],
  ['BN', 107, 106, 107, 105, 106, 106, 106, 106, 105, 105, 105, 105, 105, 105, 105],
  ['UZ', 108, 94, 80, 65, 53, 45, 41, 39, 36, 35, 35, 35, 35, 35, 35],
  ['ME', 109, 97, 92, 88, 83, 83, 81, 79, 79, 79, 79, 78, 78, 78, 78],
  ['MU', 110, 101, 102, 101, 101, 101, 101, 101, 101, 101, 101, 100, 100, 100, 100],
  ['FJ', 111, 129, 133, 132, 132, 134, 135, 135, 136, 136, 136, 136, 136, 136, 136],
  ['YE', 112, 111, 109, 103, 102, 100, 100, 100, 99, 98, 98, 98, 98, 98, 98],
  ['ZM', 113, 145, 157, 162, 168, 168, 169, 171, 171, 172, 172, 173, 173, 173, 173],
  ['MW', 114, 142, 151, 159, 161, 167, 167, 168, 170, 170, 170, 170, 170, 170, 170],
  ['KH', 115, 117, 120, 123, 122, 124, 125, 125, 125, 125, 125, 126, 126, 126, 126],
  ['BO', 116, 138, 143, 144, 147, 146, 146, 145, 145, 145, 145, 145, 145, 145, 145],
  ['MZ', 117, 140, 140, 140, 140, 139, 138, 138, 138, 137, 137, 137, 137, 137, 137],
  ['BJ', 118, 154, 162, 160, 159, 159, 160, 160, 158, 157, 157, 157, 156, 156, 156],
  ['SN', 119, 150, 154, 155, 154, 153, 153, 153, 153, 152, 151, 151, 151, 151, 151],
  ['MM', 120, 133, 132, 129, 128, 128, 126, 126, 126, 126, 126, 125, 125, 125, 125],
  ['XK', 121, 107, 104, 102, 103, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102],
  ['CI', 122, 157, 163, 161, 160, 161, 162, 162, 162, 162, 162, 161, 161, 161, 161],
  ['MN', 123, 128, 124, 121, 120, 118, 116, 114, 114, 114, 114, 114, 114, 114, 114],
  ['SS', 124, 76, 62, 54, 48, 48, 48, 47, 45, 45, 45, 45, 45, 45, 45],
  ['BI', 125, 92, 76, 68, 64, 58, 54, 53, 52, 52, 52, 50, 50, 50, 50],
  ['PR', 126, 103, 99, 99, 98, 96, 96, 95, 93, 93, 93, 93, 92, 92, 92],
  ['GT', 127, 139, 147, 151, 151, 152, 151, 151, 151, 150, 150, 150, 150, 150, 150],
  ['RW', 128, 146, 153, 157, 157, 158, 159, 159, 160, 160, 160, 160, 160, 160, 160],
  ['NA', 129, 153, 156, 158, 158, 157, 158, 158, 157, 158, 158, 158, 159, 159, 159],
  ['PA', 130, 130, 135, 135, 137, 140, 139, 140, 140, 140, 140, 140, 140, 140, 140],
  ['PG', 131, 156, 164, 164, 164, 165, 165, 165, 165, 165, 165, 165, 165, 165, 165],
  ['BB', 132, 113, 116, 117, 121, 121, 121, 123, 123, 123, 123, 123, 123, 123, 123],
  ['BF', 133, 166, 177, 178, 182, 182, 182, 181, 180, 179, 179, 179, 179, 179, 179],
  ['AO', 134, 127, 114, 104, 99, 99, 97, 97, 97, 96, 96, 96, 95, 95, 95],
  ['NE', 135, 144, 148, 152, 150, 149, 149, 148, 149, 149, 149, 149, 149, 149, 149],
  ['RE', 136, 135, 134, 128, 125, 122, 122, 122, 122, 122, 122, 121, 121, 121, 121],
  ['TJ', 137, 121, 100, 96, 86, 82, 77, 76, 75, 73, 73, 72, 72, 72, 72],
  ['MG', 138, 168, 175, 176, 176, 173, 174, 174, 173, 173, 173, 172, 172, 172, 172],
  ['PY', 139, 141, 141, 143, 145, 145, 144, 143, 143, 143, 143, 143, 143, 143, 143],
  ['DO', 140, 143, 144, 142, 144, 143, 142, 142, 142, 142, 142, 142, 142, 142, 142],
  ['CG', 141, 182, 187, 188, 190, 192, 192, 192, 192, 193, 193, 193, 193, 193, 193],
  ['VG', 142, 79, 54, 38, 27, 22, 22, 21, 20, 20, 18, 18, 18, 18, 18],
  ['CD', 143, 173, 176, 177, 178, 178, 179, 177, 177, 177, 177, 177, 177, 177, 177],
  ['GD', 144, 102, 106, 111, 112, 114, 118, 118, 119, 120, 120, 120, 120, 120, 120],
  ['ML', 145, 179, 186, 191, 193, 193, 193, 194, 194, 194, 194, 194, 194, 194, 194],
  ['AG', 146, 109, 111, 114, 113, 112, 113, 116, 116, 116, 116, 116, 116, 117, 117],
  ['TG', 147, 170, 173, 174, 171, 170, 170, 169, 169, 169, 169, 169, 169, 169, 168],
  ['LA', 148, 176, 179, 179, 179, 180, 180, 179, 178, 178, 178, 178, 178, 178, 178],
  ['AF', 149, 158, 152, 153, 152, 150, 150, 149, 148, 148, 148, 148, 148, 148, 148],
  ['KG', 150, 147, 142, 136, 133, 132, 132, 132, 132, 132, 132, 132, 132, 132, 132],
  ['CW', 151, 108, 110, 113, 114, 115, 117, 117, 117, 119, 119, 119, 119, 119, 119],
  ['GP', 152, 148, 145, 137, 135, 133, 133, 133, 133, 133, 133, 133, 133, 133, 133],
  ['NI', 153, 180, 181, 184, 186, 186, 188, 188, 189, 189, 189, 189, 189, 189, 189],
  ['KP', 154, 100, 74, 52, 40, 30, 29, 27, 26, 25, 25, 23, 23, 23, 23],
  ['HN', 155, 177, 178, 180, 183, 183, 183, 183, 183, 183, 182, 182, 182, 182, 182],
  ['BZ', 156, 163, 168, 169, 169, 169, 168, 167, 166, 166, 166, 166, 166, 167, 167],
  ['MC', 157, 122, 113, 112, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110],
  ['SL', 158, 188, 192, 196, 197, 198, 198, 198, 198, 198, 198, 198, 198, 198, 198],
  ['SZ', 159, 167, 167, 165, 163, 163, 163, 163, 163, 163, 163, 163, 163, 163, 163],
  ['LI', 160, 88, 72, 59, 51, 49, 49, 48, 44, 44, 44, 44, 44, 44, 44],
  ['SV', 161, 169, 171, 172, 170, 171, 171, 172, 172, 171, 171, 171, 171, 171, 171],
  ['GA', 162, 178, 182, 185, 187, 189, 189, 190, 190, 190, 190, 190, 190, 190, 190],
  ['NC', 163, 183, 185, 183, 180, 179, 178, 176, 176, 176, 176, 176, 176, 176, 176],
  ['LS', 164, 162, 159, 156, 155, 154, 154, 154, 154, 154, 154, 154, 153, 153, 152],
  ['BT', 165, 192, 193, 195, 195, 194, 195, 195, 195, 195, 195, 195, 195, 195, 195],
  ['BS', 166, 165, 169, 171, 173, 174, 175, 175, 175, 175, 175, 175, 175, 175, 175],
  ['PF', 167, 172, 170, 167, 165, 162, 161, 161, 161, 159, 159, 159, 158, 158, 158],
  ['GM', 168, 185, 194, 198, 199, 199, 199, 200, 200, 200, 200, 201, 201, 201, 201],
  ['GY', 169, 197, 198, 197, 198, 197, 197, 197, 197, 197, 196, 196, 196, 196, 196],
  ['SJ', 170, 160, 150, 145, 142, 137, 136, 136, 135, 135, 135, 135, 134, 134, 134],
  ['GN', 171, 199, 202, 203, 202, 203, 203, 202, 202, 202, 202, 202, 202, 202, 202],
  ['KN', 172, 155, 149, 150, 148, 147, 147, 147, 147, 147, 147, 146, 146, 146, 146],
  ['TD', 173, 193, 190, 189, 188, 187, 186, 186, 184, 184, 184, 184, 184, 184, 184],
  ['FO', 174, 152, 146, 141, 141, 141, 141, 139, 139, 139, 139, 139, 139, 139, 139],
  ['BM', 175, 137, 128, 119, 116, 113, 112, 111, 111, 111, 111, 111, 111, 111, 111],
  ['HT', 176, 196, 201, 202, 204, 204, 205, 205, 205, 205, 205, 205, 205, 205, 205],
  ['ER', 177, 194, 191, 190, 189, 188, 187, 187, 187, 186, 186, 185, 185, 185, 185],
  ['MV', 178, 181, 172, 168, 166, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164],
  ['GL', 179, 184, 183, 181, 181, 181, 181, 182, 181, 181, 181, 180, 180, 180, 180],
  ['GW', 180, 174, 174, 175, 174, 172, 173, 173, 174, 174, 174, 174, 174, 174, 174],
  ['MQ', 181, 161, 155, 154, 156, 156, 155, 156, 156, 156, 156, 156, 157, 157, 157],
  ['SR', 182, 203, 203, 204, 203, 202, 201, 201, 201, 201, 201, 200, 200, 200, 200],
  ['SO', 183, 187, 188, 186, 185, 185, 185, 185, 185, 185, 185, 186, 186, 186, 186],
  ['LR', 184, 198, 199, 200, 200, 200, 200, 199, 199, 199, 199, 199, 199, 199, 199],
  ['GF', 185, 204, 206, 205, 205, 205, 204, 204, 204, 203, 203, 203, 203, 203, 203],
  ['MR', 186, 190, 180, 173, 167, 160, 157, 155, 155, 155, 155, 155, 155, 155, 155],
  ['SM', 187, 131, 117, 109, 108, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107],
  ['WS', 188, 206, 211, 212, 213, 213, 213, 213, 213, 213, 213, 213, 212, 212, 212],
  ['ST', 189, 202, 205, 207, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208],
  ['SC', 190, 207, 210, 210, 210, 210, 210, 210, 209, 209, 209, 209, 209, 209, 209],
  ['SB', 191, 216, 217, 217, 218, 218, 218, 218, 218, 218, 218, 218, 218, 218, 218],
  ['KY', 192, 136, 122, 118, 117, 119, 119, 119, 118, 117, 118, 118, 118, 118, 118],
  ['CV', 193, 200, 196, 194, 191, 190, 190, 189, 188, 188, 188, 188, 188, 188, 188],
  ['VU', 194, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214],
  ['MO', 195, 114, 95, 92, 87, 84, 84, 83, 83, 83, 83, 83, 83, 83, 83],
  ['JE', 196, 195, 195, 192, 192, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191],
  ['CF', 197, 222, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221],
  ['TM', 198, 175, 158, 148, 139, 135, 131, 131, 128, 128, 128, 128, 128, 128, 128],
  ['GI', 199, 164, 166, 170, 175, 177, 177, 180, 182, 182, 183, 183, 183, 183, 183],
  ['AD', 200, 189, 184, 182, 184, 184, 184, 184, 186, 187, 187, 187, 187, 187, 187],
  ['PW', 201, 211, 213, 213, 212, 212, 211, 211, 211, 211, 211, 211, 210, 210, 210],
  ['TL', 202, 217, 216, 216, 216, 216, 217, 217, 217, 217, 217, 217, 217, 217, 217],
  ['DJ', 203, 210, 204, 199, 196, 195, 194, 193, 193, 192, 192, 192, 192, 192, 192],
  ['TO', 204, 215, 215, 215, 215, 215, 215, 216, 216, 216, 216, 216, 216, 216, 216],
  ['IM', 205, 171, 165, 163, 162, 166, 166, 166, 167, 168, 168, 168, 168, 168, 169],
  ['SX', 206, 151, 139, 138, 143, 144, 145, 146, 146, 146, 146, 147, 147, 147, 147],
  ['FM', 207, 220, 222, 222, 222, 222, 222, 222, 222, 222, 222, 222, 222, 222, 222],
  ['DM', 208, 212, 212, 211, 211, 211, 212, 212, 212, 212, 212, 212, 213, 213, 213],
  ['FK', 209, 209, 208, 208, 207, 206, 206, 206, 206, 206, 206, 206, 206, 206, 206],
  ['LC', 210, 191, 189, 193, 194, 196, 196, 196, 196, 196, 197, 197, 197, 197, 197],
  ['MH', 211, 219, 220, 220, 220, 220, 220, 219, 219, 219, 219, 219, 219, 219, 219],
  ['VA', 212, 132, 98, 83, 72, 66, 57, 51, 50, 48, 48, 47, 47, 46, 46],
  ['VC', 213, 208, 207, 206, 206, 207, 207, 207, 207, 207, 207, 207, 207, 207, 207],
  ['KI', 214, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224],
  ['AW', 215, 201, 200, 201, 201, 201, 202, 203, 203, 204, 204, 204, 204, 204, 204],
  ['KM', 216, 221, 219, 218, 217, 217, 216, 215, 215, 215, 215, 215, 215, 215, 215],
  ['MS', 217, 205, 197, 187, 177, 175, 172, 170, 168, 167, 167, 167, 167, 166, 166],
  ['VI', 218, 134, 94, 64, 42, 28, 25, 22, 21, 18, 17, 17, 17, 17, 17],
  ['AX', 219, 213, 209, 209, 209, 209, 209, 209, 210, 210, 210, 210, 211, 211, 211],
  ['TV', 220, 223, 223, 223, 223, 223, 223, 223, 223, 223, 223, 223, 223, 223, 223],
  ['GQ', 221, 226, 226, 226, 226, 226, 226, 226, 226, 226, 226, 226, 226, 226, 226],
  ['NR', 222, 225, 225, 225, 225, 225, 225, 225, 225, 225, 225, 225, 225, 225, 225],
  ['TC', 223, 186, 160, 146, 131, 126, 123, 121, 120, 118, 117, 117, 117, 116, 116],
  ['NU', 224, 149, 138, 139, 146, 148, 148, 150, 150, 151, 152, 152, 152, 152, 153],
  ['CK', 225, 218, 218, 219, 219, 219, 219, 220, 220, 220, 220, 220, 220, 220, 220],
  ['BQ', 226, 159, 161, 166, 172, 176, 176, 178, 179, 180, 180, 181, 181, 181, 181]
]

let data = source.slice(1).map(items=>{
  return {
    id: items[0],
    data: items.slice(1).map((subItem,index)=>{
      return {
        x: index*2,
        y: subItem
      }
    })
  }
})

const selectOpt = source[0].slice(1).map(item=>{
  return {
    value: item,
    label: item
  }
})

function App() {
  const [round, setRound] = useState(selectOpt.slice(-1)[0])
  console.log("round", round, selectOpt.slice(-1)[0])
  useEffect(()=>{
    console.log(round,selectOpt)
  })
  const changeDataLimit = (val)=>{
    setRound(val)
    data = source.slice(1).map(items=>{
      return {
        id: items[0],
        data: items.slice(1).map((subItem,index)=>{
          return {
            x: index*2,
            y: subItem
          }
        })
      }
    }).map(items=>{
      items.data = items.data.filter(node=>node.x<=val.value)
      return items
    })
  }
  return (
      <>
      <div style={{display: "flex"}}> 
        <p>Round:</p> 
        <Select 
          options={selectOpt}
          defaultValue={round}
          className ="select"
          onChange={changeDataLimit}
          placeholder="选择最大等级"
        /></div>
        
        <div className="bumps">
          <ResponsiveBump
            data={data}
            yOuterPadding={0.4}
            colors={{ scheme: 'set3' }}
            lineWidth={4}
            activeLineWidth={5}
            inactiveLineWidth={4}
            opacity={0.7}
            enableGridY={false}
            enableGridX={false}
            inactiveOpacity={0.15}
            startLabel={true}
            startLabelPadding={40}
            startLabelTextColor={{ theme: 'labels.text.fill' }}
            endLabelPadding={14}
            endLabelTextColor={{ theme: 'labels.text.fill' }}
            pointSize={11}
            activePointSize={16}
            inactivePointSize={0}
            pointColor={{ from: 'serie.color', modifiers: [] }}
            pointBorderWidth={3}
            activePointBorderWidth={3}
            pointBorderColor={{ from: 'serie.color' }}
            axisTop={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendPosition: 'middle',
                legendOffset: -36
            }}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendPosition: 'middle',
                legendOffset: 32
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'ranking',
                legendPosition: 'middle',
                legendOffset: -40
            }}
            animate={false}
            margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
            axisRight={null}
        />
        </div>
      </>
  )
}

export default App
