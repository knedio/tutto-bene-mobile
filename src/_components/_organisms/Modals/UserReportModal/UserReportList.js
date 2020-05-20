import React from 'react';
import { useSelector } from 'react-redux';
import {
    View,
    ScrollView,
    Text,
} from 'react-native';
import moment from 'moment';
import styles from './styles';

const UserReportList = () => {

    const { user } = useSelector( state => state.user );

    return (
        <ScrollView style={ styles.contentContainer }>
            {
                user.reports.length > 0
                ?
                user.reports.map( (report, index) => (
                    <View 
                        key={ `report-${index}` }
                        style={ styles.listItem }
                    >
                        <View style={ styles.listItemHeader }>
                            <Text style={ styles.listItemTitle }>{ moment(report.created_at).format('MMM D h:mm a') }</Text>
                            <Text style={ styles.listItemSubTitle }>
                                {`${report.creator.detail.firstName} ${report.creator.detail.lastName}`}
                            </Text>
                        </View>
                        <View style={ styles.listItemContent }>
                            <View style={ styles.descriptionContainer }>
                                {
                                    report.findings.length > 0
                                    ?
                                    report.findings.map( (find, fIndex) => (
                                        <Text key={fIndex} style={ styles.descriptionText }>
                                            - {find}
                                        </Text>
                                    ))
                                    :
                                    <Text style={ styles.descriptionText }>
                                        No findings.
                                    </Text>
                                }
                            </View>
                        </View>
                    </View>
                ))
                :
                <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', marginTop: 20 }}>
                    No report available.
                </Text>
            }
        </ScrollView>
    )
}

export default UserReportList
