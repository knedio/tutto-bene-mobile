export default {
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
        listItem: {
            paddingVertical: 15,
            borderBottomWidth: 1,
            borderBottomColor: '#000',
        },
            listItemHeader: {
                paddingHorizontal: 10,
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
}