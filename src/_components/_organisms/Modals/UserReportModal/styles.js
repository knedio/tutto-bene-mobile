export default {
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#000',
    },
    headerContainer: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,
        paddingTop: 20,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
        listItem: {
            marginVertical: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#000'
        },
            listItemHeader: {
                flexDirection: 'row',
            },
                listItemTitle: {
                    fontSize: 16,
                    color: '#000',
                },
                listItemSubTitle: {
                    fontSize: 12,
                    color: '#000',
                    marginLeft: 'auto',
                    alignSelf: 'center'
                },
            listItemContent: {
                flexDirection: 'row',
                paddingVertical: 8,
                flexDirection: 'row'
            },
                descriptionContainer: {
                    flex: 1,
                    flexGrow: 1,
                },
                descriptionText: {
                    color: '#000',
                    fontSize: 12,
                    textTransform: 'capitalize',
                },
    bottomContainer: { 
        marginBottom: 25, 
        marginHorizontal: 20,
    },
    linkText: {
        fontSize: 16,
        textAlign: 'center',
        paddingHorizontal: 25,
        color: '#3b99fc'
    },
    btnContainer: {
        width: 90,
        margin: 5
    },
    btnStyle: {
        borderRadius: 4,
        padding: 4,
    },
    quarantineContainer: {
        marginVertical: 5,
        marginHorizontal: 20,
        backgroundColor: '#856404',
        padding: 4,
        borderRadius: 4,
    },
    quarantineText: {
        textAlign: 'center',
        color: '#fff',
    }
}