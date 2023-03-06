from requests_html import HTMLSession
from bs4 import BeautifulSoup
import requests


def Amazon(url):
    xpaths = {
        'Title': '//*[@id="title"]',
        'Price': '//*[@id="corePriceDisplay_desktop_feature_div"]/div[1]/span[2]/span[2]/span[2]',
        'M.R.P.': '//*[@id="corePriceDisplay_desktop_feature_div"]/div[2]/span/span[1]/span/span[2]',
        'Availability': '//*[@id="availability"]/span',
        'Rating': '//*[@id="acrPopover"]/span[1]/a/i[1]/span',
        'Rating_Count': '//*[@id="acrCustomerReviewText"]',
        'Image_Link': '//*[@id="landingImage"]'
    }
    s = HTMLSession()
    r = s.get(url)

    title = r.html.xpath(xpaths['Title'], first=True)
    if title is not None:
        title = title.text.strip()

    price = r.html.xpath(xpaths['Price'], first=True)
    if price is not None:
        price = price.text.replace('₹', '').replace(',', '').strip()

    availability = r.html.xpath(xpaths['Availability'], first=True)
    if availability is not None:
        availability = availability.text

    rating = r.html.xpath(xpaths['Rating'], first=True)
    if rating is not None:
        rating = rating.text.replace('out of 5 stars', '').strip()

    img_link = r.html.xpath(xpaths['Image_Link'], first=True)
    if img_link is not None:
        img_link = img_link.attrs['src']

    rating_count = r.html.xpath(xpaths['Rating_Count'], first=True)
    if rating_count is not None:
        rating_count = rating_count.text.replace(
            ',', '').replace('ratings', '').strip()

    product = {
        'Title': title,
        'Price': price,
        'Availability': availability,
        'Rating': rating,
        'Rating_Count': rating_count,
        'Image_Link': img_link,
    }

    return product


headers = {
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36',
}
def get_soup(url):
  page = requests.get(url, headers=headers)
  soup = BeautifulSoup(page.content, 'lxml')
  return soup

def Flipkart(url):
    soup = get_soup(url=url)

    title = soup.find(class_='B_NuCI')
    if title is not None:
        title = title.text.replace('\xa0\xa0', '').strip()
    
    price = soup.find(class_='_30jeq3 _16Jk6d')
    if price is not None:
        price = price.text.replace(',', '').replace('₹', '').strip()
    
    availability = soup.find(class_='_1dVbu9')
    if availability is  None:
        availability = 'In Stock'
    else:
        availability = 'Out of Stock'

    rating = soup.find(class_='_3LWZlK')
    if rating is not None:
        rating = rating.text
    
    rating_count = soup.find(class_='_2_R_DZ')
    if rating_count is not None:
        if availability == 'In Stock':
            rating_count = rating_count.span.span.text.replace('Ratings', '').strip()
        else:
            rating_count = rating_count.text.split()[0]
    

    if availability == 'In Stock':
        img_link = soup.find(class_='_396cs4 _2amPTt _3qGmMb')
    else:
        img_link = soup.find(class_='_2r_T1I _396QI4')
    
    if img_link is not None:
        img_link = img_link.attrs['src']

    product = {
        'Title': title,
        'Price': price,
        'Availability': availability,
        'Rating': rating,
        'Rating_Count': rating_count,
        'Image_Link': img_link,
    }

    return product


if __name__ == '__main__':
    amazon_url = 'https://www.amazon.in/Sony-WH-1000XM5-Wireless-Cancelling-Headphones/dp/B09XS7JWHH/ref=sr_1_6?_encoding=UTF8&_ref=dlx_gate_sd_dcl_tlt_edd8be77_dt&content-id=amzn1.sym.a532052b-26f3-4811-a261-3b35ffa57237&crid=XMP24XPHPZVG&pd_rd_r=eb6bf299-f17b-4b6f-84d3-a63d9d49513c&pd_rd_w=2xt3z&pd_rd_wg=OAZhP&pf_rd_p=a532052b-26f3-4811-a261-3b35ffa57237&pf_rd_r=NVZ2RE9T1BSR49ERQA08&qid=1677860172&sprefix=b09cg2p4z2%2Bb09cgb6vrr%2Bb0872fkqzz%2Bb0872g7sl9%2Bb0817t8fb6%2Bb0863fr3s9%2Bb091cqh6vt%2Bb0863txgm3%2Bb0b7rzfw93%2Bb0b7s2tq7v%2Bb09cgdzhc5%2Bb09pc4yk12%2Bb09pc6qjhp%2Bb09pc695q9%2Bb094clc7wk%2Bb094c4vdjz%2Bb0b8z4bgqb%2Bb0b8z3l3vx%2Bb0b8z4mc3w%2Bb0bczkw2wj%2Bb0bcznds6w%2Bb0bczmwx1m%2Bb09yl76vsr%2Bb09yl296pm%2Bb0blyxq512%2Bb07s25ph3p%2Bb07s136htf%2Bb07s25ph3n%2Bb09ylcxlky%2Bb09ylfhfdw%2Bb09ykyjx7y%2Bb09tt3x7mf%2Bb09xs7jwhh%2Bb09xsdmt4f&sr=8-6&th=1'

    # product = Amazon(url=amazon_url)
    # print(product)
    # print()
    # print()
    flipkart_url = 'https://www.flipkart.com/canon-eos-m50-mark-ii-mirrorless-camera-ef-m15-45mm-stm-lens/p/itm7a4f536cb1255?pid=DLLGFY7XYG8YFMQT&lid=LSTDLLGFY7XYG8YFMQTBXDG2G&marketplace=FLIPKART&store=jek%2Fp31%2Ftrv&srno=b_1_1&otracker=hp_omu_Best%2Bof%2BElectronics_5_3.dealCard.OMU_Q5LU1U8PHMK6_3&otracker1=hp_omu_PINNED_neo%2Fmerchandising_Best%2Bof%2BElectronics_NA_dealCard_cc_5_NA_view-all_3&fm=neo%2Fmerchandising&iid=78b701d4-d6ab-42ee-9230-ebd75264c24e.DLLGFY7XYG8YFMQT.SEARCH&ppt=hp&ppn=homepage&ssid=p80pepzqxs0000001678109095642'

    # product = Flipkart(url=flipkart_url)
    # print(product)
    # print()
    # print()

    flipkart_un_url = 'https://www.flipkart.com/nike-flex-trainer-7-training-gym-shoes-men/p/itmf3xx8sthzfcxw?pid=SHOEZYMZRYF9YHYZ&lid=LSTSHOEZYMZRYF9YHYZXG4YJG&marketplace=FLIPKART&store=osp%2Fcil&srno=b_1_2&otracker=browse&fm=search-autosuggest&iid=9e542d23-b9a8-4d2d-8108-3b7c5f418867.SHOEZYMZRYF9YHYZ.SEARCH&ppt=browse&ppn=browse&ssid=jrsk7r55e80000001678115403387'
    # unavailable_prod = Flipkart(url=flipkart_un_url)
    # print(f'Scraping unavailable product : {unavailable_prod}')
    # print()
    # print()

    url = 'https://www.amazon.in/Samsung-Curved-Monitor-Billion-Colors/dp/B07V33RQ7S/ref=sr_1_2?pf_rd_i=1375425031&pf_rd_m=A1K21FY43GMZF8&pf_rd_p=622bf015-66ce-453b-850b-3a9ade271381&pf_rd_r=A8GT4E2BKAT1VA3GNS37&pf_rd_s=merchandised-search-18&pf_rd_t=101&qid=1678116944&refinements=p_36%3A3000000-&s=computers&sr=1-2'
    # product = Amazon(url=url)
    # print(f'Desktop: {product}')

    url = 'https://www.flipkart.com/samsung-galaxy-s23-ultra-5g-phantom-black-256-gb/p/itm15952643ba06d?pid=MOBGMFFX6E6SGYWC&lid=LSTMOBGMFFX6E6SGYWCF0WEXV&marketplace=FLIPKART&fm=neo%2Fmerchandising&iid=M_609bddfa-7a73-4ea2-9105-80d1f900e960_1_1BUWY8OBA8L9_MC.MOBGMFFX6E6SGYWC&ppt=sp&ppn=sp&ssid=qh39pluzi80000001678119464386&otracker=clp_pmu_v2_Latest%2BSamsung%2Bmobiles%2B_5_1.productCard.PMU_V2_SAMSUNG%2BGalaxy%2BS23%2BUltra%2B5G%2B%2528Phantom%2BBlack%252C%2B256%2BGB%2529_samsung-mobile-store_MOBGMFFX6E6SGYWC_neo%2Fmerchandising_4&otracker1=clp_pmu_v2_PINNED_neo%2Fmerchandising_Latest%2BSamsung%2Bmobiles%2B_LIST_productCard_cc_5_NA_view-all&cid=MOBGMFFX6E6SGYWC'
    # phone = Flipkart(url=url)
    # print(phone)
    # print()
    # print()